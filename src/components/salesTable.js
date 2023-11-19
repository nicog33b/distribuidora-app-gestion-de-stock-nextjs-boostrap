import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, EyeIcon, TrashIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import TransactionDetailsModal from './mini-componentes/transactionDetails';
import moment from 'moment';

import CashMovement from './mini-componentes/cashMovement';


const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para rastrear la dirección de ordenación
  const [sortedField, setSortedField] = useState('fecha'); // Estado para rastrear la columna por la que se está ordenando
  const [resetTable, setResetTable] = useState(false);
  const [isCashMovementModalOpen, setIsCashMovementModalOpen] = useState(false);



  const openCashMovementModal = () => {
    setIsCashMovementModalOpen(true);
  };
  
  const closeCashMovementModal = () => {
    setIsCashMovementModalOpen(false);
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
      const response = await fetch(`http://vps-3732767-x.dattaweb.com:82/api/transacciones/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza la lista de ventas
        fetchSalesData();
      } else {
        console.log('Transacción eliminada exitosamente.');
      }
    } catch (error) {
      console.error('Error al eliminar la transacción.', error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://vps-3732767-x.dattaweb.com:82/api/transacciones');
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

  const handleSort = (field) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortedField(field);
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar ventas/compras"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg m-3">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <div>

          <a href="/crearVenta" className="text-black">
            <button className="bg-green-500 text-white p-2 rounded m-1">
              <PlusIcon className='w-4 h-4' />
            </button>
          </a>

      
          <button className="bg-amber-500 text-white p-2 rounded m-1" onClick={openCashMovementModal}>
  <BanknotesIcon className='w-4 h-4' />
</button>

            
     



        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2" onClick={() => handleSort('tipo')}>
                Tipo {sortedField === 'tipo' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className='p-2'>Datos</th>
              <th className="p-2" onClick={() => handleSort('montoTotal')}>
                Monto Total {sortedField === 'montoTotal' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2" onClick={() => handleSort('fecha')}>
                Fecha {sortedField === 'fecha' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2" onClick={() => handleSort('hora')}>
                Hora {sortedField === 'hora' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales
              .sort((a, b) => {
                const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
                return a[sortedField] > b[sortedField] ? sortOrderFactor : -sortOrderFactor;
              })
              .map((sale) => (
                <tr key={sale.id}>
                  <td className="p-2 border text-center font-serif border-gray-300">{sale.tipo}</td>
                  <td className="p-2 border text-center font-serif border-gray-300">
                    <button className="rounded bg-green-100 p-1" onClick={() => openModal(sale)}>
                      Ver
                    </button>
                  </td>
                  <td className="p-2 border text-center font-serif border-gray-300">${sale.montoTotal}</td>
                  <td className="p-2 border text-center font-serif border-gray-300">
  {moment(sale.fecha).format('YYYY-MM-DD')}
</td>
                  <td className="p-2 border text-center font-serif border-gray-300">  {moment(sale.hora, 'HH:mm:ss').format('HH:mm')} </td>
                  <td className="p-2 border border-gray-300 text-center">
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

      <CashMovement isOpen={isCashMovementModalOpen} closeModal={closeCashMovementModal} />
    </div>
  );
};

export default SalesTable;
