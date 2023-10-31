import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const customStyles = {
  // Agrega tus estilos personalizados aquí
};

const EditProductModal = ({ isOpen, closeModal, product, onEditProduct }) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageURL, setProductImageURL] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.nombre);
      setProductType(product.tipo);
      setProductPrice(product.precioVenta);
      setProductImageURL(product.imagenURL);
    }
  }, [product]);

  const handleEditProduct = (event) => {
    event.preventDefault();

    const editedProduct = {
      ...product,
      nombre: productName,
      tipo: productType,
      precioVenta: parseFloat(productPrice),
      imagenURL: productImageURL,
    };

    console.log('Datos a enviar:', editedProduct);

    fetch(`http://localhost:3000/api/productos/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Producto actualizado exitosamente.');
          closeModal();

          Swal.fire({
            title: 'Éxito',
            text: 'Producto actualizado exitosamente',
            icon: 'success',
          });

          onEditProduct(editedProduct);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el producto',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud PUT:', error);

        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el producto',
          icon: 'error',
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Editar Producto"
      className="fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
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
            <label htmlFor="productType" className="block text-sm font-medium text-gray-600">
              Tipo de Producto
            </label>
            <select
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar tipo</option>
              <option value="Electrónicos">Electrónicos</option>
              <option value="Ropa">Ropa</option>
              <option value="Hogar">Hogar</option>
              {/* Agregar más opciones de tipo aquí si es necesario */}
            </select>
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
            <label htmlFor="productImageURL" className="block text-sm font-medium text-gray-600">
              URL de la Imagen del Producto
            </label>
            <input
              type="text"
              id="productImageURL"
              value={productImageURL}
              onChange={(e) => setProductImageURL(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleEditProduct}
          >
            Guardar Cambios
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

export default EditProductModal;