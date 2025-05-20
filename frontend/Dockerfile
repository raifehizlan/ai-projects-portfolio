# --- Build Aşaması ---
FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Production Aşaması ---
FROM nginx:alpine

# Nginx config (opsiyonel özelleştirme yapılabilir)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build edilen statik dosyaları Nginx dizinine kopyala
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx default olarak 80 portunu dinler
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
