import React from 'react';
import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, ArchiveBoxArrowDownIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/solid';
import AddSaleModal from './mini-componentes/addSaleModal';

const SalesTable = () => {
  const sales = [
    {
      id: 1,
      type: 'Venta',
      clientOrSupplier: 'Cliente 1',
      totalAmount: '$100.00',
      date: '2023-10-12',
      time: '14:30:00',
    },
    {
      id: 2,
      type: 'Compra',
      clientOrSupplier: 'Proveedor 1',
      totalAmount: '$150.00',
      date: '2023-10-13',
      time: '10:15:00',
    },
    // Agrega más ventas aquí...
  ];

  const [isAddSaleModalOpen, setAddSaleModalOpen] = useState(false);

  const openAddSaleModal = () => {
    setAddSaleModalOpen(true);
  };

  const closeAddSaleModal = () => {
    setAddSaleModalOpen(false);
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar ventas/compras"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg ml-2">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <div>
        <button onClick={openAddSaleModal} className="bg-green-500 text-white p-2 rounded">
        <PlusIcon className='w-4 h-4'></PlusIcon>
      </button>
      <AddSaleModal isOpen={isAddSaleModalOpen} closeModal={closeAddSaleModal} />
          {/* Agrega el modal para agregar ventas, similar al de productos */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Cliente/Proveedor</th>
              <th className="p-2">Monto Total</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.id}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.type}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.clientOrSupplier}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.totalAmount}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.date}</td>
                <td className="p-2 border text-center font-serif  border-gray-300">{sale.time}</td>
                <td className="p-2 border  border-gray-300 text-center">
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

export default SalesTable;
