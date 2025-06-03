FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copia el script y dale permisos
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# Usa el script como punto de entrada
CMD ["./entrypoint.sh"]
