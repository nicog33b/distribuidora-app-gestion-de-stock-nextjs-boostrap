import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'; // Importa el hook useRouter para gestionar redirecciones
import distribuidoraImage from "../../public/logo2.png";

import './css/main.css';

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Inicializa el hook useRouter

  useEffect(() => {
    // Comprueba si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Si el usuario está autenticado, redirige a la página de inicio
    if (isLoggedIn) {
      router.push('/');
    }
  }, []);

  const handleLogin = async () => {
    event.preventDefault();
    try {
      const response = await fetch("http://vps-3732767-x.dattaweb.com:82/api/usuarios");
      if (response.status === 200) {
        const usuarios = await response.json();
        const usuarioEncontrado = usuarios.find((u) => u.usuario === usuario && u.contrasenia === password);
        if (usuarioEncontrado) {
          // Las credenciales son correctas
          console.log("Inicio de sesión exitoso");

          // Guardar el estado de autenticación en localStorage o sessionStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('usuario', usuario);

          // Redirige a la página de inicio
          router.push('/');
        } else {
          console.error("Credenciales incorrectas");
          // Muestra un mensaje de error en caso de credenciales incorrectas.
        }
      } else {
        console.error("Error al iniciar sesión");
        // Muestra un mensaje de error en caso de otros errores.
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      // Muestra un mensaje de error en caso de error.
    }
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
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
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
              className="w-full p-3 bg-amber-600 text-white rounded-md font-semibold hover-bg-green-800"
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
