import React from 'react';
import { useState } from 'react';
import AddProductModal from './mini-componentes/addProductModal';
import { PlusIcon, MagnifyingGlassIcon, ArchiveBoxArrowDownIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/solid';

const ProductTable = () => {
  // Datos de ejemplo de productos
  const products = [
    {
      id: 1,
      name: 'Producto 1',
      price: '$10.00',
      image: 'URL de la imagen',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: '$15.00',
      image: 'URL de la imagen',
    },
    // Agrega más productos aquí...
  ];

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar productos"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg ml-2">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <div>
          <button
            onClick={openAddProductModal}
            className="bg-green-500 text-white p-2 rounded"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <AddProductModal isOpen={isAddProductModalOpen} closeModal={closeAddProductModal} />
        </div>
      </div>

      <div className="overflow-x-auto"> {/* Agregamos un contenedor con desplazamiento horizontal */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-1">ID</th>
              <th className="p-1">Nombre</th>
              <th className="p-1">Precio</th>
              <th className="p-1">Imagen</th>
              <th className="p-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-1 border text-center font-serif border-gray-300">{product.id}</td>
                <td className="p-1 border text-center font-serif border-gray-300">{product.name}</td>
                <td className="p-1 border text-center font-serif   border-gray-300">{product.price}</td>
                <td className="p-1 border  border-gray-300">
                  <img src={product.image} alt={product.name} className="w-12 h-12" />
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button className="bg-yellow-500 text-white p-2 rounded-lg mr-2">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded-lg mr-2">
                    <ArchiveBoxArrowDownIcon className="h-4 w-4" />
                  </button>
                  <button className="bg-green-500 text-white p-2 rounded-lg">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
