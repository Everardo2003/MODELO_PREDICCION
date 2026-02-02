import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const pages = [
  {
    tittle: "Sección 1",
    fields: [
      { label: "Fiebre", name: "label1" },
      { label: "Dolor de cabeza", name: "label2" },
      { label: "Mialgia", name: "label3" },
      { label: "Vomito", name: "label4" },
      { label: "Nauseas", name: "label5" },
      { label: "Artralgia", name: "label6" },
      { label: "Erupciones", name: "label7" },
      { label: "Dolor abdominal", name: "label8" },
      { label: "Leucopenia", name: "label9" },
      { label: "Trombocitopenia", name: "label10" },
    ]
  },
  {
    tittle: "Sección 2",
    fields: [
      { label: "Tos", name: "label11" },
      { label: "Hiperemia faringea", name: "label12" },
      { label: "Dolor retroorbital", name: "label13" },
      { label: "Diarrea", name: "label14" },
      { label: "Fatiga", name: "label15" },
      { label: "Sangrado", name: "label16" },
      { label: "Hematocrito", name: "label17" },
      { label: "Hepatomegalia", name: "label18" },
      { label: "Anorexia", name: "label19" },
      { label: "Escalosfrios", name: "label20" }
    ]
  },
  {
    tittle: "Sección 3",
    fields: [
      { label: "Petequias", name: "label21" },
      { label: "Adenoides", name: "label22" },
      { label: "Taquicardia", name: "label23" },
      { label: "Llagas en la boca", name: "label24" },
      { label: "Pruritus", name: "label25" },
      { label: "Constipacion", name: "label26" },
      { label: "Conciencia alterada", name: "label27" },
      { label: "Presion arterial sistolica baja", name: "label28" },
      { label: "Melena", name: "label29" },
      { label: "Fuga de plasma", name: "label30" }
    ]
  },
  {
    tittle: "Sección 4",
    fields: [
      { label: "Sangrado mucoso", name: "label31" },
      { label: "Taquipnea", name: "label32" },
      { label: "Sensibilidad cutanea", name: "label33" },
      { label: "Erupcion maculopapular", name: "label34" },
      { label: "Edema", name: "label35" },
      { label: "Disuria", name: "label36" },
      { label: "Choque", name: "label37" },
      { label: "Conjuntivitis", name: "label38" },
      { label: "Dolor en espalda baja", name: "label39" },
      { label: "Dolor de garganta", name: "label40" },
    ]
  },
  {
    tittle: "Sección 5",
    fields: [
      { label: "Eritema", name: "label41" },
      { label: "Letargia", name: "label42" },
      { label: "Malestar", name: "label43" },
      { label: "Rinorrea", name: "label44" },
      { label: "Fotofobia", name: "label45" },
      { label: "Linfadonepatia", name: "label46" },
      { label: "Odinofagia", name: "label47" },
      { label: "Dolor en general", name: "label48" },
      { label: "Parestesia", name: "label49" },
      { label: "Mareos", name: "label50" }
    ]
  },
  {
    tittle: "Sección 6",
    fields: [
      { label: "Vertigo", name: "label51" },
      { label: "Dificultad para respirar", name: "label52" },
      { label: "Trastorno del sueño", name: "label53" },
      { label: "Trastorno de concentración", name: "label54" },
      { label: "Disgeusia", name: "label55" },
      { label: "Lesion renal aguda", name: "label56" },
      { label: "Oliguria", name: "label57" },
      { label: "Convulsiones", name: "label58" },
      { label: "Congestión nasal", name: "label59" },
      { label: "Rinitis", name: "label60" }
    ]
  },
  {
    tittle: "Sección 7",
    fields: [
      { label: "Secreción de flemas", name: "label61" },
      { label: "Sibilancia", name: "label62" },
      { label: "Dolor de pecho", name: "label63" },
      { label: "Otitis", name: "label64" },
      { label: "Estornudos", name: "label65" },
      { label: "Perdida del olfato", name: "label66" },
      { label: "Perdida del gusto", name: "label67" }
    ]
  }
]

// --- Componente para cada campo con radios ---
function BinaryLabel({ label, name, value, onChange, error }) {
  return (
    <div className="mb-4">
      <span className="font-semibold">{label}</span>
      <div className="mt-2 flex gap-4">
        <label
          className={`px-4 py-2 rounded cursor-pointer transition ${
            value === true ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          <input
            type="radio"
            name={name}
            value="true"
            checked={value === true}
            onChange={() => onChange(name, true)}
            className="hidden"
          />
          Sí
        </label>
        <label
          className={`px-4 py-2 rounded cursor-pointer transition ${
            value === false ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
        >
          <input
            type="radio"
            name={name}
            value="false"
            checked={value === false}
            onChange={() => onChange(name, false)}
            className="hidden"
          />
          No
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
    </div>
  );
}

// --- Página principal del formulario ---
function FormPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [missingFields, setMissingFields] = useState({});

  const [values, setValues] = useState(
    pages.reduce((acc, page) => {
      page.fields.forEach(f => acc[f.name] = null);
      return acc;
    }, {})
  );

  const currentPage = pages[pageIndex];

  const handleNext = () => {
    const emptyField = currentPage.fields.find(f => values[f.name] === null);
    if (emptyField) {
      setError('Debes seleccionar una opción para cada síntoma.');
      setMissingFields(prev => ({ ...prev, [emptyField.name]: true }));
      const element = document.getElementsByName(emptyField.name)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setMissingFields({});
    setError('');
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const globalMissing = pages.some(page =>
      page.fields.some(f => values[f.name] === null)
    );
    if (globalMissing) {
      setError("Asegúrate de responder todas las secciones antes de enviar.");
      const newMissing = {};
      pages.forEach(page => {
        page.fields.forEach(f => {
          if (values[f.name] === null) newMissing[f.name] = true;
        });
      });
      setMissingFields(newMissing);
      const firstEmpty = pages.flatMap(p => p.fields).find(f => values[f.name] === null);
      if (firstEmpty) {
        const element = document.getElementsByName(firstEmpty.name)[0];
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const resultList = pages.flatMap(page =>
      page.fields.map(f => values[f.name])
    );

    try {
      const response = await fetch("https://modelo-prediccion-byot.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: resultList }),
      });
      if (!response.ok) throw new Error("Error en la petición");
      const data = await response.json();
      const predictionArray = data.prediction[0]; // array de floats

      await fetch("https://modelo-prediccion-byot.onrender.com/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: resultList, result: String(predictionArray) }),
      });

      localStorage.setItem("canAccessForm", "true");
      navigate("/result", { state: { prediction: predictionArray } });

    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Hubo un error al enviar los datos");
    }
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="w-4/5">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 my-10">
          <form>
            <h2 className="text-2xl mb-10 border-b-2 mt-10 text-white">{currentPage.tittle}</h2>
            {currentPage.fields.map((field, idx) => (
              <BinaryLabel
                key={idx}
                label={field.label}
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                error={missingFields[field.name]}
              />
            ))}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-between mt-6">
              {pageIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="my-5 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anterior
                </button>
              )}
              {pageIndex < pages.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="my-5 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="my-5 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
                >
                  Enviar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;