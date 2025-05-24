from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict,List
import json
import uuid
import os
from datetime import datetime
from azure.storage.blob import BlobServiceClient
import httpx  # HTTP istekleri için
from azure_table_storage import update_prediction_count, get_daily_prediction_count  # Azure Table Storage fonksiyonlarını ekledim
from blob_uploader import upload_json_to_azure
from decouple import config
from fastapi.middleware.cors import CORSMiddleware


AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING2")
AZURE_BLOB_CONTAINER_NAME=os.getenv("AZURE_BLOB_CONTAINER_NAME")
DAILY_PREDICTION_LIMIT=10

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True)

model_endpoints = {
    "deid": "https://model-deid.redwater-2caf4374.switzerlandnorth.azurecontainerapps.io/predict",
    "ner": "http://ner-service:8000/predict",
    "assertion": "http://ass:8002/predict",
    "relation": "http://rel-service:8000/predict",
    "classification": "http://classify-service:8000/predict"
}

@app.on_event("startup")
async def startup_event():
    pass  # Azure Table Storage için tabloların oluşturulmasını burada gerçekleştirebilirsiniz

class PredictionRequest(BaseModel):
    user_id: str
    text: List[str]
    model: str  # Hangi modelin kullanılacağını belirtiyoruz

class PredictionResponse(BaseModel):
    data: Dict

@app.post("/predict/")
async def predict(request: PredictionRequest, http_client: httpx.AsyncClient = Depends(lambda: httpx.AsyncClient())):
    user_id = request.user_id
    daily_prediction_count = get_daily_prediction_count(user_id)  # Azure Table Storage'dan kullanıcı tahmin sayısını al

    if daily_prediction_count >= DAILY_PREDICTION_LIMIT:
        raise HTTPException(status_code=429, detail="Daily prediction limit reached.")
    print(user_id)
    print(daily_prediction_count)
    model_name = request.model
    print(model_name)
    model_endpoint = model_endpoints.get(model_name)  # Model endpoint'ini al
    print(model_endpoint)
    print(request.text)
    if not model_endpoint:
        raise HTTPException(status_code=400, detail=f"Model '{model_name}' bulunamadı.")

    try:
        # Modeline isteği gönder
        response = await http_client.post(
            model_endpoint,
            json={"text": request.text},  # Gönderilecek veri
            timeout=60.0  # saniye
        )

        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")

        response.raise_for_status()  # Hata durumunda hata yükselt
        prediction_result = response.json()
        print(prediction_result)
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Model API'sine istek gönderilirken hata oluştu: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Model API'sinden hata yanıtı alındı: {e.response.text}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model API'sinden geçersiz JSON yanıtı alındı.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bilinmeyen bir hata oluştu: {e}")

    upload_json_to_azure(prediction_result, user_id, model_name)  # Model sonucu Azure'a yükle
    update_prediction_count(user_id)  # Kullanıcı tahmin sayısını artır


    return PredictionResponse(data=prediction_result.get("data", {}))
