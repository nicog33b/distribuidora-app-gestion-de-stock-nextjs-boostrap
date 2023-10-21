import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '300px',
  },
};

const AddProductModal = ({ isOpen, closeModal }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleAddProduct = () => {
    // Implementa la lógica para agregar el producto a tu inventario
    // Puedes acceder a los valores de productName, productPrice y productImage
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Producto"
      className="fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-600">
              Precio del Producto
            </label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-600">
              Imagen del Producto
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </form>
        <button
          className="mt-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
