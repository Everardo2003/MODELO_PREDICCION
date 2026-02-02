import os
from tensorflow.keras.models import load_model

# --- 1️⃣ Ruta del modelo ---
MODEL_PATH = "model.keras"  # Cambia si tu archivo está en otra carpeta

# --- 2️⃣ Cargar el modelo ---
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"No se encontró el archivo {MODEL_PATH}")

model = load_model(MODEL_PATH)
print("\nModelo cargado correctamente.\n")

# --- 3️⃣ Mostrar resumen del modelo ---
print("Resumen de la arquitectura del modelo:")
model.summary()