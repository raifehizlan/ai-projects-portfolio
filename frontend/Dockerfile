# Temel image'ı belirle
FROM node:16

# Çalışma dizini oluştur
WORKDIR /app

# package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# Gerekli bağımlılıkları yükle
RUN npm install

# Kaynak dosyalarını kopyala
COPY . .

# Uygulamayı çalıştır
CMD ["npm", "start"] 