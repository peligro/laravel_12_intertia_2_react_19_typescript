FROM python:3.12-slim

# Actualiza e instala paquetes necesarios
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gcc \
    python3-dev \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala herramientas adicionales de Python
RUN pip install --no-cache-dir pipenv