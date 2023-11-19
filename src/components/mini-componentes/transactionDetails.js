import React from 'react';
import moment from 'moment';



const TransactionDetailsModal = ({ isOpen, closeModal, transaction }) => {
  if (!isOpen || !transaction) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-hidden">
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-2xl font-bold mb-4">Detalles de la Transacción</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Tipo</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Hora</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border text-center font-serif border-gray-300">{transaction.tipo}</td>
                <td className="p-2 border text-center font-serif border-gray-300">  {moment(transaction.fecha).format('YYYY-MM-DD')}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{moment(transaction.hora, 'HH:mm:ss').format('HH:mm')}</td>
                <td className="p-2 border text-center font-serif border-gray-300">${transaction.montoTotal}</td>
              </tr>
            </tbody>
          </table>

          {transaction.personas.length > 0 && (
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2">Nombre</th>
        <th className="p-2">Empresa</th>
        <th className="p-2">Email</th>
      </tr>
    </thead>
    <tbody>
      {transaction.personas.map((persona) => (
        <tr key={persona._id}>
          <td className="p-2 border text-center font-serif border-gray-300">{persona.nombre}</td>
          <td className="p-2 border text-center font-serif border-gray-300">{persona.empresa}</td>
          <td className="p-2 border text-center font-serif border-gray-300">{persona.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    <div className="mb-4 overflow-auto max-h-80">
  {!(transaction.tipo.trim().toLowerCase() === "entrada" || transaction.tipo.trim().toLowerCase() === "salida") ? null : (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Nombre</th>
          <th className="p-2">Cant</th>
          <th className="p-2">Unit</th>
        </tr>
      </thead>
      <tbody>
        {transaction.tableFinal.map((product) => (
          <tr key={product.productId}>
            <td className="p-2 border text-center font-serif border-gray-300">{product.nombre}</td>
            <td className="p-2 border text-center font-serif border-gray-300">
              {product.lots.reduce((total, lot) => total + lot.cantidad, 0)}
            </td>
            <td className="p-2 border text-center font-serif border-gray-300">${product.precioUnitario}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>



{/* Mostrar el comentario solo si existe */}
{transaction.comentario && (
            <div className="mb-4">
              <label htmlFor="comentario" className="block text-gray-700 text-sm font-bold mb-2">
                Comentario:
              </label>
              <input
                type="text"
                id="comentario"
                value={transaction.comentario}
                readOnly // Hace que el input sea de solo lectura
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button onClick={closeModal} className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
