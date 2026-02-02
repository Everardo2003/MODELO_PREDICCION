from fastapi import FastAPI
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import requests  # 👈 para llamar a Google Apps Script

# --- 1️⃣ Inicializar app ---
app = FastAPI(title="Backend de Predicción")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2️⃣ Cargar modelo ---
MODEL_PATH = "model.keras"
model = load_model(MODEL_PATH)

# --- 3️⃣ Definir esquemas ---
class InputData(BaseModel):
    features: list[int]

class SaveData(BaseModel):
    features: list[int]
    result: str

# --- 4️⃣ Endpoint para predicción ---
@app.post("/predict")
def predict(data: InputData):
    x = np.array([[float(f) for f in data.features]])
    prediction = model.predict(x)
    return {"prediction": prediction.tolist()}

@app.get("/")
def root():
    return {"message": "Backend de predicción activo"}

# --- 5️⃣ Endpoint para guardar en Google Sheets ---
@app.post("/save")
def save(data: SaveData):
    #  Imprimir lo que llega desde el frontend
    print("Datos recibidos:", data.dict())

    #URL de tu Apps Script
    SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHtjEUJE6C4ki-dMIAAnEz_b3qQB4Y1nl85Lc8tL5nGPuSICsTuOfScWBQmajHJbGqAw/exec"

    # Payload que se envía al Apps Script
    payload = {
        "features": data.features,
        "result": data.result
    }

    try:
        # Enviar al Apps Script como JSON
        r = requests.post(SCRIPT_URL, json=payload, timeout=10)
        r.raise_for_status()

        # Imprimir la respuesta para depurar
        print("Respuesta de Apps Script:", r.text)

        return {"status": "ok", "message": "Datos guardados en Google Sheets", "script_response": r.text}
    except Exception as e:
        print("Error al guardar en Google Sheets:", e)
        return {"status": "error", "message": str(e)}

