FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    postgresql-client \
    libffi-dev \
    python3-dev \
    gcc \
    libssl-dev \
    ca-certificates \
  && update-ca-certificates \
  && rm -rf /var/lib/apt/lists/*
  
COPY requirements.txt .

RUN pip install --no-cache-dir --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt

COPY . .
ENV APP_HOST=0.0.0.0
ENV APP_PORT=8000

CMD ["sh", "-c", "uvicorn app.main:app --host ${APP_HOST} --port ${APP_PORT}"]