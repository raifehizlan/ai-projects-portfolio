# Python 3.11 tabanlı bir resmi imaj kullanıyoruz
FROM python:3.10-slim

# Çalışma dizinini oluşturuyoruz
WORKDIR /app

# Gerekli Python paketlerini yüklemek için requirements.txt dosyasını kopyalıyoruz
COPY requirements.txt /app/

# Bağımlılıkları kuruyoruz
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama kodlarını kopyalıyoruz
COPY . /app/

# FastAPI'nin Uvicorn ile çalıştırılmasını sağlıyoruz
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
