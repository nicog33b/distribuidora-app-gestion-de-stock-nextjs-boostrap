import React, { useState, useEffect } from 'react';

const AddProductModal = ({ isOpen, closeModal }) => {
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

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: productName,
          precioVenta: parseFloat(productVenta),
          precioCompra: parseFloat(productCompra), // Aquí corregir el nombre del estado
          imagenURL: productImageURL,
          tipo: productType,
        }),
      });
  
      // Resto del código...
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      // Manejar errores de red u otros errores
    }
  };

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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
              <label htmlFor="productImageURL" className="block text-gray-700 text-sm font-bold mb-2">URL de la Imagen</label>
              <input
                type="text"
                id="productImageURL"
                value={productImageURL}
                onChange={(e) => setProductImageURL(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
  <label htmlFor="productType" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Producto</label>
  <select
    id="productType"
    value={productType}
    onChange={(e) => setProductType(e.target.value)}
    className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Elegir tipo</option> {/* Opción adicional */}
    {types.map((type) => (
      <option key={type._id} value={type.tipo}>
        {type.tipo}
      </option>
    ))}
  </select>
</div>


<div className="flex justify-center mt-4">
              <button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mr-4">Agregar Producto</button>
              <button onClick={closeModal} className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full">Cerrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
