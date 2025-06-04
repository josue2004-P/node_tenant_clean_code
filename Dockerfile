FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala nodemon globalmente para desarrollo
RUN npm install && npm install -g nodemon

# Copia el resto del código
COPY . .

# Expone el puerto (opcional si usas express en 3000, por ejemplo)
EXPOSE 3000

# Usa nodemon para reiniciar la app al detectar cambios
CMD ["npm","run", "dev"]