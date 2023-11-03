import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddStock = ({ isOpen, closeModal, productId }) => {
  const [stockTotal, setStockTotal] = useState(0);
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [nombre, setNombre] = useState(''); // Nuevo campo para identificar el lote

  const handleStockSubmit = async (event) => {
    event.preventDefault();
  
    const newStock = {
      productId,
      stockTotal: parseInt(stockTotal),
      fechaVencimiento,
      nombre, // Incorporar el nombre del lote
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStock),
      });
  
      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Nuevo stock agregado exitosamente',
          icon: 'success',
        }).then(() => {
          closeModal(); // Close the modal after success message
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al agregar el stock',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al agregar stock:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al agregar el stock',
        icon: 'error',
      });
    }
  };
  

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-end">
            <button onClick={closeModal} className="text-gray-600">
              &times;
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Agregar Stock</h2>
          <form onSubmit={handleStockSubmit}>
            <div className="mb-4">
              <label htmlFor="stockTotal" className="block text-gray-700 text-sm font-bold mb-2">Stock Total:</label>
              <input
                type="number"
                id="stockTotal"
                value={stockTotal}
                onChange={(e) => setStockTotal(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fechaVencimiento" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento:</label>
              <input
                type="date"
                id="fechaVencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agregar Stock</button>
            </div>
          </form>

          

        </div>
        
      </div>
    </div>
  );
};

export default AddStock;
