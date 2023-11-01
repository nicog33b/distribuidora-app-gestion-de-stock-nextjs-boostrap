import React, { useState, useEffect } from 'react';


const LoteProductModal = ({ product, isOpen, closeModal }) => {
  const [lots, setLots] = useState([]); // Estado para almacenar los lotes del producto
  const [selectedLots, setSelectedLots] = useState({}); // Estado para almacenar la cantidad seleccionada de cada lote

  // Simulación de solicitud a la API para obtener los lotes de stock del producto seleccionado
  useEffect(() => {
    // Aquí deberías realizar la solicitud a la API para obtener los lotes de stock del producto según su ID
    // Reemplaza este bloque por la lógica de solicitud a tu API
    // Ejemplo de estructura de datos de lotes obtenidos de la API:
    const fetchedLots = [
      { _id: '1', lotName: 'Lote 1', lotQuantity: 10, lotExpiration: '2023-12-31' },
      { _id: '2', lotName: 'Lote 2', lotQuantity: 20, lotExpiration: '2023-11-15' },
      // ... otros lotes
    ];

    setLots(fetchedLots);
  }, [product]); // Asegúrate de actualizar los lotes cuando cambie el producto seleccionado

  // Manejar la cantidad seleccionada de cada lote
  const handleSelectLot = (lotId, quantity) => {
    setSelectedLots({ ...selectedLots, [lotId]: quantity });
  };

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className='CONTENIDO'>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Detalles del Producto</h2>
              {/* Mostrar detalles del producto */}
              {/* ... otros detalles del producto */}
            </div>

            {/* Tabla para mostrar los lotes disponibles */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Vencimiento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seleccionar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lots.map(lot => (
                  <tr key={lot._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{lot.lotName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lot.lotQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lot.lotExpiration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="w-16 py-1 border rounded-md"
                        type="number"
                        min="0"
                        max={lot.lotQuantity}
                        value={selectedLots[lot._id] || 0}
                        onChange={(e) => handleSelectLot(lot._id, parseInt(e.target.value))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteProductModal;
