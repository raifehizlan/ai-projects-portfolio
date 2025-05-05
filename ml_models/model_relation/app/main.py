from typing import Dict, List , Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import json, os, warnings, logging, sys
from fastapi.middleware.cors import CORSMiddleware
from aimped.nlp.relation_visualizer import *
from decouple import config
from PIL import Image, ImageFont, ImageDraw
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, pipeline
from model_loader import AzureModelLoader
from aimped.nlp.pipeline import Pipeline  # NER ve assertion metodlarının olduğu modül
from aimped.nlp.tokenizer import sentence_tokenizer, word_tokenizer
import pandas as pd

warnings.filterwarnings("ignore")

print("Model dependencies imported")


app = FastAPI(title="Relation Extraction API", version="1.0.0", description="Relation Extraction Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Models ------------------

class PredictionRequest(BaseModel):
    text: List[str] = Field(..., example=["The patient was prescribed 500 mg paracetamol twice daily for 5 days."],  description="List of input texts.")
    entity: List[str] = Field(None, example=[
    "Strength-Drug",
    "Form-Drug",
    "Frequency-Drug",
    "Route-Drug",
    "Dosage-Drug",
    "Reason-Drug",
    "ADE-Drug",
    "Duration-Drug"
]
, description="Entity types to apply relation extraction.")

    
class PredictionResponse(BaseModel):
    status: bool
    data_type: str = "data_json"
    output: List[List[Dict]] = None
    data_svg: Optional[str] = None  # SVG içeriği burada
    error: str = None

class HealthResponse(BaseModel):
    name: str
    status: str

# ---------------- Model Class ------------------

class RelationModel:
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
        self.rel_model_dir = self.local_dir +  "/rel_model"

        # Internal state
        self.classifier = None
        self.pipe = None
        self.rel_model = None
        self.rel_tokenizer = None
        self.ner_model = None
        self.ner_tokenizer = None
        self.return_svg = True
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
            self.rel_model = AutoModelForSequenceClassification.from_pretrained(self.rel_model_dir)
            self.rel_tokenizer = AutoTokenizer.from_pretrained(self.rel_model_dir)
            device_id = 0 if self.device == 'cuda' else -1
            self.classifier = pipeline(task="sentiment-analysis", model=self.rel_model, tokenizer=self.rel_tokenizer, truncation=True, max_length=512, device=device_id)

            # Load NER model
            self.ner_model = AutoModelForTokenClassification.from_pretrained(self.ner_model_dir).to(self.device)
            self.ner_tokenizer = AutoTokenizer.from_pretrained(self.ner_model_dir)
            self.pipe = Pipeline(model=self.ner_model, tokenizer=self.ner_tokenizer, device=self.device)

            self.ready = True
            print("Model successfully loaded.")
        except Exception as e:
            print(f"Failed to load models: {e}")
            self.ready = False

    def get_prediction(self, text: str, classifier, relation_white_label_list):
        sentences = sentence_tokenizer(text, "english")
        sents_tokens_list = word_tokenizer(sentences)
        white_label_list = ['ADE', 'Dosage', 'Drug', 'Duration', 'Form', 'Frequency', 'Reason', 'Route', 'Strength']

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
        if not relation_white_label_list:
            relation_white_label_list =  [
                                        "Strength-Drug",
                                        "Form-Drug",
                                        "Frequency-Drug",
                                        "Route-Drug",
                                        "Dosage-Drug",
                                        "Reason-Drug",
                                        "ADE-Drug",
                                        "Duration-Drug",
                                        ]


        relation_pairs = [  ("Drug", "Strength"),
                            ("Drug", "Form"),
                            ("Drug", "Frequency"),
                            ("Drug", "Route"),
                            ("Drug", "Dosage"),
                            ("Drug", "Reason"),
                            ("Drug", "ADE"),
                            ("Drug", "Duration")]

        results = self.pipe.relation_result(
            sentences = sentences, 
            ner_chunk_results=results,
            relation_classifier=classifier,
            relation_white_label_list=relation_white_label_list,
            relation_pairs = relation_pairs,
            return_svg=self.return_svg
        )
        return results

    def predict(self, request: Dict):
        if not self.ready:
            self.load()

        texts = request.get("text", [])
        relation_white_label_list = request.get("entity", [])

        if len(texts) == 0:
            return {"status": False, "error": "No input text provided."}



        results = [self.get_prediction(text, self.classifier, relation_white_label_list) for text in texts]
        print("output",results)
        if self.return_svg and len(results[0]):
            final =  pd.DataFrame(results[0]).drop(columns = ['sentID','sentence','sent_begin1','sent_end1','sent_begin2','sent_end2'],axis=1).to_dict(orient='records')
            text, svg_input = vizu(results[0])
            display = RelationExtractionVisualizer()
            svg = display.display(text, svg_input, show_relations = True, return_html = True)
        
            return  {"status": True, "data_type": self.data_type, "output": final,
            "data_svg"   : svg}
        else:
            return {"status"      : True,
                            "data_type"  : self.data_type,
                            "output"     : results}


# ---------------- Instance ------------------

model_instance = RelationModel()

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
