# ----- Kütüphane importları -----
from typing import Dict, List
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field
import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification
from aimped.nlp.tokenizer import sentence_tokenizer, word_tokenizer
from aimped.nlp.pipeline import Pipeline
from decouple import config
import warnings
import json, os, requests, logging, sys
from fastapi.middleware.cors import CORSMiddleware



sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Azure Model Loader import
from model_loader import AzureModelLoader

# ----- Uyarıları kapat -----
warnings.filterwarnings('ignore')


print("Model dependencies imported")


# ----- FastAPI uygulaması başlat -----
app = FastAPI(
    title=config("MODEL_NAME"),
    version="0.1.0",
    description="A FastAPI application for de-identification (DEID) with Named Entity Recognition (NER)."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse sadece 'http://localhost:3000'
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----- API Request/Response Modelleri -----

class PredictionRequest(BaseModel):
    text: List[str] = Field(..., example=["Der 45-jährige Patient Herr Müller wurde am 12.03.2023 wegen Brustschmerzen in die Kardiologie der Charité Berlin eingewiesen."], description="List of texts to process.")
    entity: List[str] = Field(default=[], example=["CITY", "PATIENT", "DATE"], description="Entities to focus on. If empty, all entities are processed.")
    masked: bool = Field(default=False, description="Whether to mask the entities (e.g., [CITY]).")
    faked: bool = Field(default=False, description="Whether to replace entities with synthetic (fake) data.")

class PredictionResponse(BaseModel):
    status: bool = Field(..., description="True if processing successful, False otherwise.")
    data_type: str = Field(default="data_json", description="Type of returned data.")
    output: List[Dict] = Field(..., description="List of outputs for each input text.")
    error: str = Field(default=None, description="Error message if any error occurred.")

class HealthResponse(BaseModel):
    name: str = Field(..., description="Model name.")
    status: str = Field(default="OK", description="Health status of the model.")

# ----- Ana Model Sınıfı -----

class KFServeHealthDeidNerModel:
    def __init__(self):
        self.name = config("MODEL_NAME")
        self.container_name = os.getenv("AZURE_STORAGE_CONTAINER")
        self.prefix = config("PREFIX")  # aynı şeyi kullanıyoruz
        self.device = "cpu"
        self.local_dir = os.path.abspath(__file__).replace("main.py", config("LOCAL_FOLDER"))
        self.ready = False
        self.data_type = "data_json"

        self.model = None
        self.tokenizer = None
        self.pipe = None


        # Azure Model Loader ile indirme
        model_loader = AzureModelLoader(
            connection_string=os.getenv("AZURE_STORAGE_CONNECTION_STRING"),
            container_name=self.container_name,
            prefix=self.prefix,
            local_dir=self.local_dir
        )
        model_loader.download_blobs()

        self.load()

        print(f"Model {self.name} initialized")

    def load(self):
        """
        Model ve Tokenizer yüklenir, Pipeline hazırlanır.
        """
        try:
            self.model = AutoModelForTokenClassification.from_pretrained(self.local_dir)
            self.model.to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained(self.local_dir)
            self.pipe = Pipeline(model=self.model, tokenizer=self.tokenizer, device=self.device)
            self.ready = True
            print(f"Model loaded successfully: {self.name}")

            # Backend'e aktiflik bildirimi
            # if self.backend_url:
            #     self.notify_backend()

        except Exception as e:
            print(f"Error loading model: {e}")
            raise HTTPException(status_code=500, detail=f"Model loading error: {str(e)}")

    # def notify_backend(self):
    #     """
    #     Backend'e modelin aktif olduğunu bildirir.
    #     """
    #     try:
    #         res = json.dumps({"is_active": True, "model_name": self.name})
    #         headers = {'Content-Type': 'application/json; charset=UTF-8'}
    #         response = requests.post(self.backend_url, headers=headers, data=res)
    #         print(f"Backend notified successfully: {response.status_code}")
    #     except Exception as err:
    #         print.error(f"Error notifying backend: {err}")

    # def update_backend_url(self, new_url: str):
    #     """
    #     Backend URL'sini günceller ve tekrar bildirim gönderir.
    #     """
    #     self.backend_url = new_url
    #     print(f"Backend URL updated to: {self.backend_url}")
    #     if self.ready:
    #         self.notify_backend()

    def get_prediction(self, text: str, white_label_list: List[str], faked: bool, masked: bool):
        """
        Girilen bir cümlede NER sonucu ve masking/faking uygular.
        """
        sentences = sentence_tokenizer(text, "german")
        sents_tokens_list = word_tokenizer(sentences)
        tokens, preds, probs, begins, ends = self.pipe.ner_result(text=text, sents_tokens_list=sents_tokens_list, sentences=sentences)
        if not white_label_list:
            white_label_list = ["AGE", "CITY", "COUNTRY", "DATE", "DOCTOR","EMAIL", "HOSPITAL", "IDNUM", "ORGANIZATION", "PATIENT","PHONE",
            "PROFESSION", "SSN", "STREET", "ZIP", "ACCOUNT", "DLN", "IP","FAX", "LICENCE", "PLATE", "URL", "VIN"]
        results = self.pipe.chunker_result(text, white_label_list, tokens, preds, probs, begins, ends)
        regex_json_files_path = os.path.abspath(__file__).replace("main.py", "json_regex")
        results = self.pipe.regex_model_output_merger(regex_json_files_path, results, text, white_label_list)

        fake_csv_path = os.path.abspath(__file__).replace("main.py", "fake.csv")
        results = self.pipe.deid_result(text, results, fake_csv_path, faked=faked, masked=masked)
        return results
        




    def predict(self, request: PredictionRequest):
        """
        Birden fazla input text'i işler.
        """
        if not self.ready:
            raise HTTPException(status_code=503, detail="Model not loaded yet")

        if not request.text:
            print.error("No input text provided")
            raise HTTPException(status_code=400, detail="No input text provided")
        print(request.text)
        outputs = [self.get_prediction(text, request.entity, request.faked, request.masked) for text in request.text]
        print("Prediction completed successfully")
        return {"status": True, "data_type": self.data_type, "output": outputs}

# ----- Model Instance -----
model_instance = KFServeHealthDeidNerModel()

# ----- API Endpointleri -----

@app.get("/health", response_model=HealthResponse)
async def health():
    return {"name": model_instance.name, "status": "Ready" if model_instance.ready else "Loading"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        return model_instance.predict(request)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))




