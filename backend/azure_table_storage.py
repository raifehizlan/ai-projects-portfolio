from azure.data.tables import TableServiceClient, TableEntity, UpdateMode
from datetime import datetime, timezone, timedelta
import os
from decouple import config

# Azure Storage bağlantısı
connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING") or config("AZURE_STORAGE_CONNECTION_STRING")
table_name = "predictionlimits"

# Azure Table Service Client oluştur
service_client = TableServiceClient.from_connection_string(conn_str=connection_string)
table_client = service_client.get_table_client(table_name)

# Kullanıcının tahmin sayısını güncellemek için fonksiyon
def update_prediction_count(user_id: int | str):
    user_id_str = str(user_id)
    partition_key = f"user_{user_id_str}"
    row_key = "prediction_count"

    try:
        entity = table_client.get_entity(partition_key=partition_key, row_key=row_key)
        entity["prediction_count"] = int(entity.get("prediction_count", 0)) + 1
        table_client.update_entity(entity=entity, mode=UpdateMode.MERGE)
    except Exception:
        # Eğer entity yoksa veya erişilemezse, oluşturmak için upsert_entity kullan
        entity = {
            "PartitionKey": partition_key,
            "RowKey": row_key,
            "prediction_count": 1,
            "expiresAt": (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()
        }
        table_client.upsert_entity(entity=entity,  mode=UpdateMode.MERGE)  # ✅ upsert kullanılıyor

# Günlük tahmin limitini sorgulamak için
def get_daily_prediction_count(user_id: int | str) -> int:
    user_id_str = str(user_id)
    partition_key = f"user_{user_id_str}"
    row_key = "prediction_count"

    try:
        entity = table_client.get_entity(partition_key=partition_key, row_key=row_key)
        return int(entity.get("prediction_count", 0))
    except Exception:
        return 0

# TTL kontrolü ve temizliği
def cleanup_expired_entries():
    current_time = datetime.now(timezone.utc)
    entities = table_client.list_entities()

    for entity in entities:
        try:
            expiry_time = datetime.fromisoformat(entity["expiresAt"])
            if expiry_time.tzinfo is None:
                expiry_time = expiry_time.replace(tzinfo=timezone.utc)

            if expiry_time < current_time:
                print(f"Expired data deleted: {entity['RowKey']}")
                table_client.delete_entity(partition_key=entity["PartitionKey"], row_key=entity["RowKey"])
        except Exception as e:
            print(f"Hata oluştu: {e}")
