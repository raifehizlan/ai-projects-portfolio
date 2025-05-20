from azure.data.tables import TableServiceClient, TableEntity
from datetime import datetime, timedelta
import os
from decouple import config
# Azure Storage bağlantısı
connection_string = config("AZURE_TABLE_STORAGE_CONNECTION_STRING")
table_name = "predictionlimits"  # Table adı

# Azure Table Service Client oluştur
service_client = TableServiceClient.from_connection_string(conn_str=connection_string)
table_client = service_client.get_table_client(table_name)

# Kullanıcının tahmin sayısını güncellemek için fonksiyon
def update_prediction_count(user_id: int):
    partition_key = f"user_{user_id}"
    row_key = f"prediction_count"
    
    try:
        entity = table_client.get_entity(partition_key=partition_key, row_key=row_key)
        entity['prediction_count'] += 1  # Günlük tahmin sayısını artır
        table_client.update_entity(entity=entity)
    except Exception as e:
        # Eğer entity yoksa, yeni bir entity oluştur
        entity = TableEntity(
            PartitionKey=partition_key,
            RowKey=row_key,
            prediction_count=1,  # İlk tahmin
            expiresAt=(datetime.utcnow() + timedelta(days=1)).isoformat()  # 24 saatlik TTL
        )
        table_client.create_entity(entity=entity)

# Kullanıcının günlük tahmin limitini almak için fonksiyon
def get_daily_prediction_count(user_id: int) -> int:
    partition_key = f"user_{user_id}"
    row_key = f"prediction_count"
    
    try:
        entity = table_client.get_entity(partition_key=partition_key, row_key=row_key)
        return int(entity.get('prediction_count', 0))  # Burada int dönüşümü yapıyoruz
    except Exception as e:
        return 0  # Eğer veri yoksa, tahmin sayısı 0'dır


# TTL'yi kontrol etmek ve geçerli olmayan verileri silmek için fonksiyon
def cleanup_expired_entries():
    current_time = datetime.utcnow()
    
    entities = table_client.list_entities()
    for entity in entities:
        expiry_time = datetime.fromisoformat(entity['expiresAt'])
        
        if expiry_time < current_time:
            print(f"Expired data deleted: {entity['RowKey']}")
            table_client.delete_entity(partition_key=entity['PartitionKey'], row_key=entity['RowKey'])
