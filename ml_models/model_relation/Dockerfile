# ----------------------
# 1. Temel imaj (hafif)
# ----------------------
    FROM python:3.10-slim AS base

    # Ortam değişkenleri
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONUNBUFFERED 1
    
    # Sistem bağımlılıklarını yükle
    RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
        libffi-dev \
        libssl-dev \
        wget \
        curl \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*
    
    # ----------------------
    # 2. Çalışma klasörü
    # ----------------------
    WORKDIR /app
    
    # Gereksinim dosyasını kopyala ve kur
    COPY requirements.txt .
    
    # CPU-only Torch için değiştiriyoruz
    RUN pip install --upgrade pip && \
        pip install torch==2.1.0+cpu torchvision==0.16.0+cpu -f https://download.pytorch.org/whl/torch_stable.html && \
        pip install -r requirements.txt && \
        rm -rf ~/.cache/pip
    RUN pip install python-decouple


    RUN pip install nltk
    RUN python -m nltk.downloader punkt
    # ----------------------
    # 3. Uygulamayı kopyala
    # ----------------------
    COPY ./app/ /app/
    
    # ----------------------
    # 4. Çalıştırma komutu
    # ----------------------
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]
    