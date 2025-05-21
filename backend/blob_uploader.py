# uploader.py
from azure.storage.blob import BlobServiceClient, ContentSettings
import os
import json
import uuid
from datetime import datetime
from decouple import config

AZURE_STORAGE_CONNECTION_STRING=os.getenv("AZURE_STORAGE_CONNECTION_STRING")
AZURE_BLOB_CONTAINER_NAME=os.getenv("AZURE_BLOB_CONTAINER_NAME")
print(AZURE_BLOB_CONTAINER_NAME)

def upload_json_to_azure(json_data: dict, user_id: int, model_name: str) -> str:
    """
    Bir JSON nesnesini Azure Blob Storage'a hiyerarşik bir klasör yapısıyla yükler.

    Args:
        json_data (dict): Yüklenecek JSON verisi.
        user_id (int): Kullanıcı ID'si.
        model_name (str): Modelin adı (klasör adı olarak kullanılacak).

    Returns:
        str: Yüklenen blob'un URL'si.
    """
    # 1. JSON verisini string'e dönüştür
    print(json_data)
    json_string = json.dumps(json_data, indent=4)

    # 2. Blob adını hiyerarşik yapıyla oluştur
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    blob_name = f"{model_name}/user_{user_id}/prediction_{timestamp}_{uuid.uuid4().hex}.json"
    print(blob_name)
    # 3. Azure Blob Storage'a yükle
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    container_client = blob_service_client.get_container_client(AZURE_BLOB_CONTAINER_NAME)
    # Container varsa hiçbir şey yapmaz, yoksa oluşturur.
    if not container_client.exists():
        container_client.create_container()

    blob_client = container_client.get_blob_client(blob=blob_name)

    blob_client.upload_blob(
        json_string.encode('utf-8'),
        overwrite=True,
        content_settings=ContentSettings(content_type="application/json")
    )

    # 4. Public URL üret (eğer container public ise)
    blob_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{AZURE_BLOB_CONTAINER_NAME}/{blob_name}"

