# ----- Kütüphane importları -----
from typing import Dict, List
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from decouple import config
import warnings
import json, os, logging, sys
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
    description="A FastAPI application for text classification (ADE prediction)."

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
    text: List[str] = Field(..., example=["The 45-year-old patient Mr. Müller was admitted to cardiology at Charité Berlin due to chest pains."], description="List of texts to process.")


class PredictionResponse(BaseModel):
    status: bool = Field(..., description="True if processing successful, False otherwise.")
    data_type: str = Field(default="data_json", description="Type of returned data.")
    output: List[Dict] = Field(..., description="List of outputs for each input text.")
    error: str = Field(default=None, description="Error message if any error occurred.")

class HealthResponse(BaseModel):
    name: str = Field(..., description="Model name.")
    status: str = Field(default="OK", description="Health status of the model.")

# ----- Ana Model Sınıfı -----

class ClassificationModel:
    def __init__(self):
        self.name = config("MODEL_NAME")
        self.container_name = config("AZURE_STORAGE_CONTAINER")
        self.prefix = config("PREFIX")  # aynı şeyi kullanıyoruz
        self.device = "cpu"
        self.local_dir = os.path.abspath(__file__).replace("main.py", config("LOCAL_FOLDER"))
        self.ready = False
        self.data_type = "data_json"

        self.model = None
        self.tokenizer = None
        self.classifier = None

        self.backend_url = config("BACKEND_URL", default=None)

        # Azure Model Loader ile indirme
        model_loader = AzureModelLoader(
            connection_string=config("AZURE_STORAGE_CONNECTION_STRING"),
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
            self.model = AutoModelForSequenceClassification.from_pretrained(self.local_dir)
            self.model.to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained(self.local_dir)
            # Pipeline oluştur
            self.classifier = pipeline(task="sentiment-analysis", model=self.model, tokenizer=self.tokenizer, truncation=True, max_length=512, device=-1, top_k=2)

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
    def reshape_output(self, result=None):
        """
        Output formatını düzenler.
        """
        output = []
        if result is not None:
            for j in result:
                for i, item in enumerate(j):
                    item.sort(key=lambda x: x['score'], reverse=True)  # Higher comes first
                    category = item[0]['label']
                    output.append({"category": [category], "classes": item})
            return output
        else:
            return result
    def predict(self, request: Dict):
        """
        Birden fazla input text'i işler.
        """
        if not self.ready:
            self.load()

        # Getting inputs from request object
        texts = request.get("text", [])

        if len(texts) == 0:
            print("No input text provided")
            return json.dumps({"status": False, "error": "No input text provided"})

        try:
            print("--> Prediction pipeline is running...")
            result = [self.classifier(text) for text in texts]

            print("--> setting output...")
            output = self.reshape_output(result=result)

            print("--> Responding output...")
            return json.dumps({
                "status": True,
                "data_type": self.data_type,
                "output": output
            })

        except Exception as e:
            print(e)
            return json.dumps({"status": False, "error": str(e)})
# ----- Model Instance -----
model_instance = ClassificationModel()

# ----- API Endpointleri -----

@app.get("/health", response_model=HealthResponse)
async def health():
    return {"name": model_instance.name, "status": "Ready" if model_instance.ready else "Loading"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        return json.loads(model_instance.predict(request.dict()))
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


























