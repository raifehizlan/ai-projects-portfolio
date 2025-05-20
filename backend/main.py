from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict,List
import json
import uuid
from datetime import datetime
from azure.storage.blob import BlobServiceClient
import httpx  # HTTP istekleri için
from azure_table_storage import update_prediction_count, get_daily_prediction_count  # Azure Table Storage fonksiyonlarını ekledim
from decouple import config
from blob_uploader import upload_json_to_azure

AZURE_STORAGE_CONNECTION_STRING = config("AZURE_STORAGE_CONNECTION_STRING")
AZURE_BLOB_CONTAINER_NAME=config("AZURE_BLOB_CONTAINER_NAME")
DAILY_PREDICTION_LIMIT=int(config("DAILY_PREDICTION_LIMIT"))

app = FastAPI()

model_endpoints = {
    "deid": "https://model-deid:8000/predict",
    "ner": "http://ner-service:8000/predict",
    "assertion": "http://as-service:8000/predict",
    "relation": "http://rel-service:8000/predict",
    "classification": "http://classify-service:8000/predict"
}

@app.on_event("startup")
async def startup_event():
    pass  # Azure Table Storage için tabloların oluşturulmasını burada gerçekleştirebilirsiniz

class PredictionRequest(BaseModel):
    user_id: int
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

    model_name = request.model
    model_endpoint = model_endpoints.get(model_name)  # Model endpoint'ini al

    if not model_endpoint:
        raise HTTPException(status_code=400, detail=f"Model '{model_name}' bulunamadı.")

    try:
        # Modeline isteği gönder
        response = await http_client.post(
            model_endpoint,
            json={"text": request.text},  # Gönderilecek veri
            timeout=30.0  # saniye
        )
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


    return PredictionResponse(data=prediction_result)
