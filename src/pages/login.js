'use client';
import React, { useState } from "react";
import Image from "next/image";
import distribuidoraImage from "../../public/logo2.png";
import './css/main.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, solo mostraremos un mensaje de inicio de sesión exitoso
    alert(`Inicio de sesión exitoso\nEmail: ${email}\nContraseña: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className=" bg-amber-900 max-w-md w-full p-6 space-y-6 rounded-lg shadow-lg">
        <div className="p-0">
          <div className="mx-auto mb-4 w-64 h-64">
            <Image src={distribuidoraImage} alt="Distribuidora Logo" layout="responsive" />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Tu usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-amber-600 text-white rounded-md font-semibold hover:bg-green-800"
            >
              Acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
