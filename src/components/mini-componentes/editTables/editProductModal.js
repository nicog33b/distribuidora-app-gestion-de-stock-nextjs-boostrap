import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const EditProductModal = ({ isOpen, closeModal, product, onEditProduct }) => {
  const [productName, setProductName] = useState('');
  const [productVenta, setProductVenta] = useState('');
  const [productCompra, setProductCompra] = useState('');
  const [productImageURL, setProductImageURL] = useState('');
  const [productType, setProductType] = useState('');
  const [types, setTypes] = useState([]); // Estado para almacenar los tipos

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/types');
        if (response.ok) {
          const data = await response.json();
          setTypes(data);
        } else {
          console.error('Error al cargar los tipos desde la API');
        }
      } catch (error) {
        console.error('Error al cargar los tipos desde la API:', error);
      }
    };

    fetchTypes();
  }, []);


  useEffect(() => {
    if (product) {
      setProductName(product.nombre);
      setProductVenta(product.precioVenta);
      setProductCompra(product.precioCompra);
      setProductImageURL(product.imagenURL);
      setProductType(product.tipo);
    }
  }, [product]);

  const handleEditProduct = async (event) => {
    event.preventDefault();

    const editedProduct = {
      ...product,
      nombre: productName,
      precioVenta: parseFloat(productVenta),
      precioCompra: parseFloat(productCompra),
      imagenURL: productImageURL,
      tipo: productType,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/productos/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
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
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto',
        icon: 'error',
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar Producto"
      className="modal fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
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
                    <option value="">Elegir tipo</option> {/* Opción adicional */}
    {types.map((type) => (
      <option key={type._id} value={type.tipo}>
        {type.tipo}
      </option>
    ))}
              </select>
            </div>

            {/* Agregar el bloque de Venta y Compra */}
            <div className="mb-4 flex">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <label htmlFor="productVenta" className="block text-gray-700 text-sm font-bold mb-2">
                  Venta
                </label>
                <input
                  type="number"
                  id="productVenta"
                  value={productVenta}
                  onChange={(e) => setProductVenta(e.target.value)}
                  className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div style={{ flex: '0 0 50%' }}>
                <label htmlFor="productCompra" className="block text-gray-700 text-sm font-bold mb-2">
                  Compra
                </label>
                <input
                  type="number"
                  id="productCompra"
                  value={productCompra}
                  onChange={(e) => setProductCompra(e.target.value)}
                  className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            {/* Fin de bloque Venta y Compra */}


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
            <div className="flex justify-center mt-4">
  <button
    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 mr-2"
    onClick={handleEditProduct}
  >
    Guardar Cambios
  </button>
  <button
    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-400"
    onClick={closeModal}
  >
    Cerrar
  </button>
</div>
          </form>
          
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;