import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const prediction = location.state?.prediction;

    const diseases = ["Dengue", "Zica", "Chinkungunya", "Influenza"];

    let resultDisease = null;
    if (prediction && prediction[0]) {
        const probs = prediction[0]; // el array de floats
        const maxIndex = probs.indexOf(Math.max(...probs));
        resultDisease = diseases[maxIndex];
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold mb-6'>Resultado</h1>

        {prediction ? (
            <div className='p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md'>
                <p className='text-xl'>
                Enfermedad viral:{" "}
                <span className='font-semibold text-blue-600'>
                    {resultDisease}
                </span>
                </p>
            </div>
        ) : (
            <p className='text-red-500'> No se recibieron resultados.</p>
        )}

        <button
            onClick={() => {
                localStorage.removeItem("canAccessForm");
                navigate("/login")}
            }
            className='mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
        >
            Volver al Inicio
        </button>
    </div>
  )
}

export default Result