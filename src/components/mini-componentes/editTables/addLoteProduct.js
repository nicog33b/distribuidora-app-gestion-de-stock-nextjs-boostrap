import React, { useState, useEffect } from 'react';

const LoteProductModal = ({ product ,isOpen, closeModal }) => {
  const [productArray, setProductArray] = useState(product)  
  const [lotName, setLotName] = useState('');
  const [lotQuantity, setLotQuantity] = useState('');
  const [lotExpiration, setLotExpiration] = useState('');




  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <form>
            <div className="mb-4">
              <label htmlFor="lotName" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Lote</label>
              <input
                type="text"
                id="lotName"
                value={productArray}
                onChange={(e) => setLotName(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
      
              <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cerrar</button>
         
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoteProductModal;
