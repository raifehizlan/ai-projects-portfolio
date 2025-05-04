from typing import Dict, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import json, os, warnings, logging, sys
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, pipeline
from model_loader import AzureModelLoader
from aimped.nlp.pipeline import Pipeline  # NER ve assertion metodlarının olduğu modül
from aimped.nlp.tokenizer import sentence_tokenizer, word_tokenizer

warnings.filterwarnings("ignore")

print("Model dependencies imported")


app = FastAPI(title="Assertion Status API", version="1.0.0", description="Assertion Status Prediction Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Models ------------------

class PredictionRequest(BaseModel):
    text: List[str] = Field(..., example=["Patient denies experiencing nausea."], description="List of input texts.")
    entity: List[str] = Field(..., example=["absent", "associated_with_someone_else","conditional", "hypothetical","possible","present"], description="Entity types to apply assertion classification.")
class PredictionItem(BaseModel):
    begin: int
    end: int
    ner_label: str
    chunk: str
    assertion: str
    score: float
    
class PredictionResponse(BaseModel):
    status: bool
    data_type: str = "data_json"
    output: List[List[PredictionItem]] = None
    error: str = None

class HealthResponse(BaseModel):
    name: str
    status: str

# ---------------- Model Class ------------------

class AssertionModel:
    def __init__(self):
        self.name = config("MODEL_NAME")
        self.device = "cpu"
        self.ready = False
        self.data_type = "data_json"
        self.container_name = config("AZURE_STORAGE_CONTAINER")
        self.prefix = config("PREFIX")  # aynı şeyi kullanıyoruz
        # PATHs
        self.local_dir = os.path.abspath(__file__).replace("main.py", config("LOCAL_FOLDER"))

        self.ner_model_dir = self.local_dir + "/ner_model"
        self.as_model_dir = self.local_dir +  "/assertion_model"
        print(self.ner_model_dir)
        print(self.as_model_dir)
        # Internal state
        self.classifier = None
        self.pipe = None
        self.as_model = None
        self.as_tokenizer = None
        self.ner_model = None
        self.ner_tokenizer = None
        self.load()


        self.backend_url = config("BACKEND_URL", default=None)

        # Azure Model Loader ile indirme
        model_loader = AzureModelLoader(
            connection_string=config("AZURE_STORAGE_CONNECTION_STRING"),
            container_name=self.container_name,
            prefix=self.prefix,
            local_dir=self.local_dir
        )
        model_loader.download_blobs()

        print(f"Model {self.name} initialized")


    def load(self):
        try:
            # Load assertion classifier
            self.as_model = AutoModelForSequenceClassification.from_pretrained(self.as_model_dir)
            self.as_tokenizer = AutoTokenizer.from_pretrained(self.as_model_dir)
            device_id = 0 if self.device == 'cuda' else -1
            self.classifier = pipeline(task="sentiment-analysis", model=self.as_model, tokenizer=self.as_tokenizer, truncation=True, max_length=512, device=device_id)

            # Load NER model
            self.ner_model = AutoModelForTokenClassification.from_pretrained(self.ner_model_dir).to(self.device)
            self.ner_tokenizer = AutoTokenizer.from_pretrained(self.ner_model_dir)
            self.pipe = Pipeline(model=self.ner_model, tokenizer=self.ner_tokenizer, device=self.device)

            self.ready = True
            print("Model successfully loaded.")
        except Exception as e:
            print(f"Failed to load models: {e}")
            self.ready = False

    def get_prediction(self, text: str, classifier, assertion_white_label_list):
        sentences = sentence_tokenizer(text, "english")
        sents_tokens_list = word_tokenizer(sentences)
        white_label_list = ["problem", "test", "treatment"]

        tokens, preds, probs, begins, ends, sent_begins, sent_ends, sent_idxs = self.pipe.ner_result(
            text=text,
            sents_tokens_list=sents_tokens_list,
            sentences=sentences,
            assertion_relation=True,
        )

        results = self.pipe.chunker_result(
            text=text,
            white_label_list=white_label_list,
            tokens=tokens,
            preds=preds,
            probs=probs,
            begins=begins,
            ends=ends,
            assertion_relation=True,
            sent_begins=sent_begins,
            sent_ends=sent_ends,
            sent_idxs=sent_idxs,
        )
        if not assertion_white_label_list:
            assertion_white_label_list = ["absent", "associated_with_someone_else","conditional", "hypothetical","possible","present"]
        
        
        results = self.pipe.assertion_result(
            ner_results=results,
            classifier=classifier,
            assertion_white_label_list=assertion_white_label_list,
            sentences=sentences,
        )
        return results

    def predict(self, request: Dict):
        if not self.ready:
            self.load()

        texts = request.get("text", [])
        white_labels = request.get("entity", [])

        if len(texts) == 0:
            return {"status": False, "error": "No input text provided."}
        if len(white_labels) == 0:
            return {"status": False, "error": "No input entity provided."}

        try:
            results = [self.get_prediction(text, self.classifier, white_labels) for text in texts]
            
            return  {"status": True, "data_type": self.data_type, "output": results}
        except Exception as e:
            return {"status": False, "error": str(e)}

# ---------------- Instance ------------------

model_instance = AssertionModel()

# ---------------- Routes ------------------

@app.get("/health", response_model=HealthResponse)
async def health():
    return {"name": model_instance.name, "status": "Ready" if model_instance.ready else "Loading"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        return model_instance.predict(request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
