import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const prediction = location.state?.prediction;

    const diseases = ["Dengue", "Zica", "Chinkungunya", "Influenza"];

    let resultDisease = null;
    if (prediction) {
        const probs = prediction; // array de floats
        const maxIndex = probs.indexOf(Math.max(...probs));
        resultDisease = diseases[maxIndex];
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500'>
            <h1 className='text-3xl font-bold mb-6 text-white'>Resultado</h1>

            {prediction ? (
                <div className='p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg'>
                    <p className='text-xl text-white'>
                        Enfermedad viral:{" "}
                        <span className='font-semibold text-yellow-300'>
                            {resultDisease}
                        </span>
                    </p>
                </div>
            ) : (
                <p className='text-red-300'>No se recibieron resultados.</p>
            )}

            <button
                onClick={() => {
                    localStorage.removeItem("canAccessForm");
                    navigate("/login")
                }}
                className='mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
            >
                Volver al Inicio
            </button>
        </div>
    )
}

export default Result;