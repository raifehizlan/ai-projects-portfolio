from azure.storage.blob import BlobServiceClient
import os

class AzureModelLoader:
    def __init__(self, connection_string: str, container_name: str, prefix: str, local_dir: str):
        self.connection_string = connection_string
        self.container_name = container_name
        self.prefix = prefix.rstrip("/")  # güvenli: sonda "/" yoksa bile sorun olmaz
        self.local_dir = local_dir

        os.makedirs(self.local_dir, exist_ok=True)

        self.blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
        self.container_client = self.blob_service_client.get_container_client(self.container_name)

    def download_blobs(self):
        try:
            blobs = list(self.container_client.list_blobs(name_starts_with=self.prefix))

            if not blobs:
                print(f"❌ '{self.prefix}' ile başlayan dosya bulunamadı.")
                return

            for blob in blobs:
                blob_name = blob.name
                blob_client = self.container_client.get_blob_client(blob)

                # Yerel dosya yolu (klasör yapısını koruyarak dosya yolu oluşturuluyor)
                # Blob adı, prefix sonrası kalan kısmı yerel dosya yoluna dönüştürüyoruz
                relative_path = os.path.relpath(blob_name, self.prefix)  # prefix sonrası kısımlar
                local_path = os.path.join(self.local_dir, relative_path)  # yerel yol

                # Klasörler yoksa oluşturuluyor
                os.makedirs(os.path.dirname(local_path), exist_ok=True)

                # Dosya zaten varsa indirilmiyor
                if os.path.exists(local_path):
                    print(f"ℹ️ Zaten mevcut: {local_path} — atlanıyor.")
                    continue

                # Dosya indiriliyor
                with open(local_path, "wb") as file:
                    data = blob_client.download_blob()
                    file.write(data.readall())

                print(f"⬇️ İndirildi: {blob_name} ➡️ {local_path}")

            print(f"\n✅ '{self.prefix}' ile başlayan dosyalar '{self.local_dir}' klasörüne indirildi (yenileri).")

        except Exception as e:
            print(f"⚠️ Hata oluştu: {e}")
