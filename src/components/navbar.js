import React, { useEffect } from 'react';
import Image from 'next/image';
import distribuidoraImage from '../../public/logo3.png';
import { PowerIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';


const Navbar = () => {
  useEffect(() => {
    // Comprueba si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    if (!isLoggedIn) {
      window.location.href = '/login'; // Otra opción es utilizar window.location.href como lo habías hecho antes
    }
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.clear(); // Borra todos los datos de localStorage
    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
  };

  const handleConfiguration = () => {
    // Lógica para configuración
  };

  return (
    <div className="w-full bg-amber-800 text-white p-2 flex justify-between items-center shadow-sm shadow-black border border-amber-900">
      <div className="h-12 w-12">
        <Image src={distribuidoraImage} alt="Distribuidora Logo" />
      </div>
      <div className="flex items-center">
        <div className="mr-4">Horacio</div>
        <div className="flex space-x-2">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            <PowerIcon className="h-4 w-4 rounded" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
