import React, { useState } from "react";

   
const EditStockModal = ({ isOpen, closeModal, agregarProductoCompra}) => {
  const [stockTotal, setStockTotal] = useState(0);
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const handleStockSubmit = (e) => {
    e.preventDefault();
    const newStockData = parseFloat(stockTotal);
    const stockDetails = {
      stockQuantity: newStockData,
      expirationDate: fechaVencimiento,
    };

    // Llamar a la función agregarProductoCompra con la cantidad y la fecha
    agregarProductoCompra(stockDetails.stockQuantity,fechaVencimiento);
    closeModal();
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

export default EditStockModal;
