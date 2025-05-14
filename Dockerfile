# Imagen base
FROM node:22-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY frontend/package*.json ./frontend/

# Instala las dependencias
RUN cd frontend && npm install

# Copia el resto del código del frontend
COPY frontend ./frontend

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando para ejecutar el servidor en modo desarrollo
CMD ["npm", "run", "dev", "--prefix", "frontend"]
