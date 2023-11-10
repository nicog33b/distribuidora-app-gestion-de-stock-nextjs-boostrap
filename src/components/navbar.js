import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PowerIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { distribuidoraImage } from '/public/logo3.png';

const Navbar = () => {
  const [userName, setUserName] = useState(''); // Inicializa userName como un estado

  useEffect(() => {
    // Comprueba si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      window.location.href = '/login';
    } else {
      // Obtén el nombre de usuario almacenado en localStorage
      const storedUserName = localStorage.getItem('usuario');
      setUserName(storedUserName); // Actualiza el estado userName
    }
  }, []); // Asegúrate de pasar un arreglo vacío como segundo argumento para que el efecto se ejecute solo una vez al cargar el componente

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.clear();
    window.location.href = '/login';
  };


  const distribuidoraImage = 'https://drive.google.com/uc?id=1AbL1ITzNpSL1sQfa8xg0NEz8E1liIbLH';
 
  return (
    <div className="w-full bg-amber-800 text-white p-1 flex justify-between items-center shadow-sm shadow-black border border-amber-900">
      <div className="h-16 w-16">
        <img src={distribuidoraImage}   className='object-cover' alt="Distribuidora Logo"/>
      </div>
      <div className="flex items-center">
        <div className="mr-4">{userName}</div>
        <div className="flex space-x-2">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-slate-300">
            <PowerIcon className="h-4 w-4 rounded " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
