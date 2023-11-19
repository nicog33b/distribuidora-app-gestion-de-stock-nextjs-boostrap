import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CashMovement = ({ isOpen, closeModal }) => {
  const [tipo, setTipo] = useState('entrada');
  const [monto, setMonto] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleMovementSubmit = async (event) => {
    event.preventDefault();

    // Obtener la fecha y hora actual
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // Formato HH:mm:ss

    // Crear el objeto de datos para la transacción
    const compraTransactionData = {
      tipo: tipo,
      fecha: formattedDate,
      hora: formattedTime,
      comentario:comentario,
      montoTotal: parseFloat(monto),
      personas: [],
      tableFinal: {
      
      },
    };
    

    // Realizar la solicitud a api/transacciones
    try {
      const response = await fetch('http://vps-3732767-x.dattaweb.com:82/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compraTransactionData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Nuevo movimiento agregado exitosamente',
          icon: 'success',
        }).then(() => {
          closeModal();
          window.location.reload();
        });
      } else {
        console.log(compraTransactionData)
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al agregar el movimiento',
          icon: 'error',
        });
        
      }
    } catch (error) {
     
      console.error('Error al agregar movimiento:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al agregar el movimiento',
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
          <h2 className="text-xl font-bold mb-4">Agregar Movimiento</h2>
          <form onSubmit={handleMovementSubmit}>
            <div className="mb-4">
              <label htmlFor="tipo" className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="monto" className="block text-gray-700 text-sm font-bold mb-2">Monto:</label>
              <input
                type="number"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comentario" className="block text-gray-700 text-sm font-bold mb-2">Comentario:</label>
              <input
                type="text"
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agregar Movimiento</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CashMovement
