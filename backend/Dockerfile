FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev postgresql-client && rm -rf /var/lib/apt/lists/* && apt-get install -y ca-certificates && update-ca-certificates

COPY requirements.txt .

RUN pip install --no-cache-dir --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt

COPY ./app/ .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]