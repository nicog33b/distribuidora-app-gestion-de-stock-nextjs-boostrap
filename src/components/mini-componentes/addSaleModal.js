import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};

const AddSaleModal = ({ isOpen, closeModal }) => {
  const [saleType, setSaleType] = useState('Venta');
  const [clientOrSupplier, setClientOrSupplier] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Variables para agregar items
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemUnitPrice, setItemUnitPrice] = useState(0);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    // Agregar un nuevo item a la lista de items
    const newItem = {
      name: itemName,
      quantity: itemQuantity,
      unitPrice: itemUnitPrice,
    };
    setItems([...items, newItem]);

    // Limpiar los campos de entrada de item
    setItemName('');
    setItemQuantity(0);
    setItemUnitPrice(0);
  };

  const handleAddSale = () => {
    // Implementa la lógica para agregar la venta o compra, incluyendo los items
    // Puedes acceder a los valores de saleType, clientOrSupplier, totalAmount, date, time y items
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Venta o Compra"
      className="fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="bg-amber-600 p-4 rounded-lg shadow-lg w-full max-w-3xl flex">
        <div className="w-1/2 pr-4">
          {/* Resto de los campos, como saleType, clientOrSupplier, totalAmount, date y time */}
          {/* ... */}
          {/* Campos para agregar items */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Agregar item a venta</h3>
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-600">
                Nombre del Item
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="itemQuantity" className="block text-sm font-medium text-gray-600">
                Cantidad del Item
              </label>
              <input
                type="number"
                id="itemQuantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="itemUnitPrice" className="block text-sm font-medium text-gray-600">
                Precio Unitario
              </label>
              <input
                type="number"
                id="itemUnitPrice"
                value={itemUnitPrice}
                onChange={(e) => setItemUnitPrice(e.target.value)}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              className="bg-green-300 text-white py-2 px-4 rounded hover:bg-green-500 mt-2"
              onClick={handleAddItem}
            >
              Agregar Item
            </button>
          </div>
        </div>
        <div className="w-1/2">
          {/* Tabla que muestra los items agregados */}
          {items.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white" >Items Agregados</h3>
              <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-amber-400">
                      <th className="p-2">Nombre del Item</th>
                      <th className="p-2">Cantidad</th>
                      <th className="p-2">Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 border border-gray-300">{item.name}</td>
                        <td className="p-2 border border-gray-300">{item.quantity}</td>
                        <td className="p-2 border border-gray-300">{item.unitPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddSaleModal;
