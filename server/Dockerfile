# The Virtual Closet - API (FastAPI)
FROM python:3.12-slim

WORKDIR /app

# psycopg2-binary and rembg ship prebuilt wheels, but pip still needs a C
# compiler for a couple of transitive deps without wheels on slim images.
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --create-home appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
