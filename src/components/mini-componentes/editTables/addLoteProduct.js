import React, { useState, useEffect } from 'react';

const LoteProductModal = ({ product, isOpen, closeModal, agregarProducto, transactionType}) => {
  const [lots, setLots] = useState([]);
  const [selectedLots, setSelectedLots] = useState({});


  useEffect(() => {
    if (!isOpen) {
      setLots([]);
      setSelectedLots({});
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await fetch(`http://vps-3732767-x.dattaweb.com:82/api/stocks/${product._id}`);
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos de stock');
        }
        const data = await response.json();
        setLots(data);
      } catch (error) {
        console.error('Error al obtener los lotes de stock:', error);
      }
    };

    if (isOpen) {
      fetchLots();
    }
  }, [product, isOpen]);

  const handleInputChange = (e, lotId) => {
    const quantity = parseInt(e.target.value);
    const availableQuantity = lots.find(lot => lot._id === lotId)?.stockTotal || 0;
    const selectedQuantity = quantity > availableQuantity ? availableQuantity : quantity;
    setSelectedLots(prevLots => ({
      ...prevLots,
      [lotId]: selectedQuantity,
    }));
  };

 const handleAddProduct = () => {
    agregarProducto(product, selectedLots);
    closeModal(); // Cerrar el modal
  };

  const handleCloseModal = () => {
    closeModal(); // Cerrar el modal
  };
  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className='CONTENIDO'>
          <div className="mb-4 overflow-auto max-h-80">
              
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4">Lote</th>
                    <th className="py-2 px-4">Stock Total</th>
                    <th className="py-2 px-4">Fecha de Vencimiento</th>
                    <th className="py-2 px-4">Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map(lot => (
                    <tr key={lot._id} className="bg-white text-gray-700">
                      <td className="py-2 px-4">{lot.nombre}</td>
                      <td className="py-2 px-4">{lot.stockTotal}</td>
                      <td className="py-2 px-4">{lot.fechaVencimiento}</td>
                      <td className="py-2 px-4">
                        <input
                          className="w-16 py-1 border rounded-md"
                          type="number"
                          min="0"
                          max={lot.stockTotal}
                          value={selectedLots[lot._id] || 0}
                          onChange={(e) => handleInputChange(e, lot._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 border p-3 flex justify-center">
              <button onClick={handleCloseModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1">
                Cerrar
              </button>
              <button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1">
                Agregar producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteProductModal;
