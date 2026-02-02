import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem("canAccessForm", "true");
    navigate("/form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="border-none p-10 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full bg-white/20 backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Bienvenido</h1>
        <button
          type="button"
          onClick={handleStart}
          className="hover:cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all"
          aria-label="Comenzar formulario"
        >
          <span>Comenzar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Login;