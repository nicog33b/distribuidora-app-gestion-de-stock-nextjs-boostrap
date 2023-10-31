import React from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import UserSelectionComponent from './mini-componentes/peopleSelectInSell';
import ProductSearch from './mini-componentes/productSelectedInSell';


const NewSaleDate = () => {
  return (
    <div className="w-full mx-auto p-8">
      <div className="flex items-center mt-4">
        <button className="flex items-center rounded border border-black p-2">
          <ArrowUturnLeftIcon className="w-3 h-3 mr-1" />
          <span>Transacciones</span>
        </button>
      </div>

      {/* Persona Seleccion Component */}
      <UserSelectionComponent />
      {/* Termina Persona Seleccion */}

      {/* Componente de Búsqueda y Visualización de Productos */}
      <ProductSearch />
      {/* Termina Búsqueda de Productos */}
    </div>
  );
};

export default NewSaleDate;
