import React from 'react';
import { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon,  PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid';

const LotesTable = () => {
    const [lotes, setLotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('');


  
    const filteredLotes = lotes.filter(lote => {
      return lote.productId.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
 
 
    const deleteLote = async (loteId) => {
        try {
          const response = await fetch(`http://localhost:3000/api/stocks/${loteId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Eliminar el lote localmente después de eliminarlo en la base de datos
            setLotes(lotes.filter((lote) => lote._id !== loteId));
          } else {
            console.error('Error al eliminar el lote');
          }
        } catch (error) {
          console.error('Error al eliminar el lote', error);
        }
      };
    
  
  const fetchLotesData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/stocks');
      if (response.ok) {
        const data = await response.json();
        setLotes(data);
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
    fetchLotesData();
  }, []); // Este efecto se ejecutará solo una vez, ya que el array de dependencias está vacío




  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
        <input
            type="text"
            placeholder="Buscar productId"
            className="p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div>
       
        </div>


      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
          
              <th className='p-2'>Id producto</th>
              <th className="p-2">Vencimiento</th>
              <th className="p-2">Ingreso</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {filteredLotes.map((lote) => (
          <tr key={lote._id}>
            
            <td className="p-2 border text-center font-serif border-gray-300">
            {lote.productId}
            </td>

            <td className="p-2 border text-center font-serif border-gray-300">
              {/* Muestra la fecha de vencimiento (sin la hora) */}
              {new Date(lote.fechaVencimiento).toLocaleDateString()}
            </td>
            <td className="p-2 border text-center font-serif border-gray-300">
              {/* Muestra la fecha de ingreso (sin la hora) */}
              {new Date(lote.fechaIngreso).toLocaleDateString()}
            </td>

            <td className="p-2 border text-center font-serif  border-gray-300">
             {lote.stockTotal}
            </td>


            <td className="p-2 border  border-gray-300 text-center">
              <button className="bg-red-500 text-white p-2 rounded-lg mr-2" onClick={() => deleteLote(lote._id)}>
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

    </div>
  );
};

export default LotesTable;
