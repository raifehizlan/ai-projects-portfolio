# uploader.py
from azure.storage.blob import BlobServiceClient, ContentSettings
import os
from decouple import config
import uuid
AZURE_CONNECTION_STRING = config("AZURE_SVG_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = "svgcontainer"  # örnek: "svg-container"

def upload_svg_to_azure(svg_string: str) -> str:
    # 1. Geçici dosya oluştur
    filename = f"{uuid.uuid4()}.svg"
    local_path = f"./temp_svg/{filename}"
    os.makedirs("temp_svg", exist_ok=True)
    
    with open(local_path, "w", encoding="utf-8") as f:
        f.write(svg_string)

    # 2. Azure Blob Storage'a yükle
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob="temp/"+filename)

    with open(local_path, "rb") as data:
        blob_client.upload_blob(
            data,
            overwrite=True,
            content_settings=ContentSettings(content_type="image/svg+xml")
        )

    # 3. Yerel dosyayı sil
    os.remove(local_path)

    # 4. Public URL üret (eğer container public ise)
    blob_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{CONTAINER_NAME}/temp/{filename}"
    return blob_url
