import React from 'react';

const formatFecha = (fecha) => {
  return fecha.slice(0, 10);
};

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
                <td className="p-2 border text-center font-serif border-gray-300">{formatFecha(transaction.fecha)}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{transaction.hora}</td>
                <td className="p-2 border text-center font-serif border-gray-300">{transaction.montoTotal}</td>
              </tr>
            </tbody>
          </table>

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

          <div className="mb-4 overflow-auto max-h-80">
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
                    <td className="p-2 border text-center font-serif border-gray-300">{product.precioUnitario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button onClick={closeModal} className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
