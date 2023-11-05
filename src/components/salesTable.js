import React from 'react';
import { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon,  PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid';
import TransactionDetailsModal from './mini-componentes/transactionDetails';


const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Estado para almacenar la transacción seleccionada

  
  const formatFecha = (fecha) => {
    return fecha.slice(0, 10);
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/transacciones/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza la lista de ventas
        fetchSalesData();
      } else {
        console.error('Error al eliminar la transacción');
      }
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  };
  
  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/transacciones');
      if (response.ok) {
        const data = await response.json();
        setSales(data);
        console.log(data); // Agregar esta línea para depuración
      } else {
        console.error('Error al obtener las transacciones');
      }
    } catch (error) {
      console.error('Error al obtener las transacciones', error);
    }
  };

  // Llamar a la función fetchSalesData una vez al cargar el componente
  useEffect(() => {
    fetchSalesData();
  }, []); // Este efecto se ejecutará solo una vez, ya que el array de dependencias está vacío




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
        <a href="/crearVenta" className="text-black">
            <button className="bg-green-500 text-white p-2 rounded">
              <PlusIcon className='w-4 h-4' />
            </button>
          </a>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Tipo</th>
              <th className='p-2'>Datos</th>
              <th className="p-2">Monto Total</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="p-2 border text-center font-serif border-gray-300">{sale.tipo}</td>
                <td className="p-2 border text-center font-serif border-gray-300">
                  <button className="rounded bg-green-100 p-1" onClick={() => openModal(sale)}>
                    Ver
                  </button>
                </td>
                <td className="p-2 border text-center font-serif border-gray-300">${sale.montoTotal}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{formatFecha(sale.fecha)}</td>
                <td className="p-2 border text-center font-serif  border-gray-300">{sale.hora}</td>
                <td className="p-2 border  border-gray-300 text-center">
              <button className="bg-red-500 text-white p-2 rounded-lg mr-2" onClick={() => deleteTransaction(sale._id)}>
                <TrashIcon className="h-4 w-4" />
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
      <TransactionDetailsModal isOpen={isModalOpen} closeModal={closeModal} transaction={selectedTransaction} />
    </div>
  );
};

export default SalesTable;
