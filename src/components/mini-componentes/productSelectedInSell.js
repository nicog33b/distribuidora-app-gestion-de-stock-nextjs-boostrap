import React, { useState, useEffect } from 'react';
import LoteProductModal from '../mini-componentes/editTables/addLoteProduct'; // Importar el componente del modal de lote

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [selectedProducts, setSelectedProducts] = useState([]);

  
  const agregarProducto = (selectedProduct, selectedLots) => {
    const existingProductIndex = selectedProducts.findIndex(
      (product) => product.producto._id === selectedProduct._id
    );

    if (existingProductIndex !== -1) {
      const updatedSelectedProducts = [...selectedProducts];
      const existingProduct = updatedSelectedProducts[existingProductIndex];

      if (existingProduct.hasOwnProperty('cantidad')) {
        const updatedLots = { ...existingProduct.cantidad };

        Object.keys(selectedLots).forEach((lotId) => {
          updatedLots[lotId] = (updatedLots[lotId] || 0) + selectedLots[lotId];
        });

        existingProduct.cantidad = updatedLots;
        updatedSelectedProducts[existingProductIndex] = existingProduct;
      } else {
        existingProduct.cantidad = { ...selectedLots };
      }

      setSelectedProducts(updatedSelectedProducts);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          producto: selectedProduct,
          cantidad: { ...selectedLots },
        },
      ]);
    }
  };
  
  // Lógica para eliminar un producto del array de productos seleccionados
const eliminarProducto = (productId) => {
  const updatedSelectedProducts = selectedProducts.filter(
    (product) => product.producto._id !== productId
  );
  setSelectedProducts(updatedSelectedProducts);
};

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
    } else {
      const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtered = products.filter(product =>
        product.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedSearchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const openLoteModal = (selectedProduct) => {
    setSelectedProduct(selectedProduct); // Asignar el objeto de producto seleccionado
    setModalIsOpen(true); // Abrir el modal al hacer clic en un producto
    console.log(selectedProduct)
  };

  const closeLoteModal = () => {
    setModalIsOpen(false); // Cerrar el modal
  };

  return (
    <div className="w-full mx-auto p-8">
      <div className="w-1/2 mx-auto">
        <input
          className="w-full h-10 p-2 rounded border text-center"
          type="text"
          placeholder="Buscar Producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {filteredProducts.map(product => (
         <div key={product._id} className="border rounded p-2 text-center hover:border-green-900" onClick={() => openLoteModal(product)}>
            <img src={product.imagenURL} alt={product.nombre} className="w-16 h-16 object-cover mb-2 mx-auto" />
            <div className='text-lg font-bold'>{product.nombre}</div>
            <div className='font-semibold'>Tipo: {product.tipo}</div>
            <div className='font-semibold'>Precio: ${product.precioVenta}</div>
          </div>
        ))}
      </div>



      {/* Modal de lote */}
      <LoteProductModal
        isOpen={modalIsOpen}
        product={selectedProduct}
        closeModal={closeLoteModal}
        agregarProducto={agregarProducto}
      />


      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className='rounded bg-green-500'>
            <th className="border border-gray-400">ID</th>
            <th className="border border-gray-400">Nombre</th>
            <th className="border border-gray-400">Unitario</th>
            <th className='border border-gray-400'>Total</th>
            <th className="border border-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
      {Object.keys(selectedProducts).map((productId) => {
        const product = selectedProducts[productId];
        const totalQuantity = Object.keys(product.cantidad).reduce((acc, lotId) => acc + product.cantidad[lotId], 0);

        return (
          <tr key={product.producto._id}>
            <td className="border border-gray-400">{product.producto._id}</td>
            <td className="border border-gray-400">{product.producto.nombre}</td>
            <td className="border border-gray-400">{product.producto.precioVenta}</td>
            <td className="border border-gray-400">{totalQuantity}</td>
            <td className="border border-gray-400">
              <button onClick={() => eliminarProducto(product.producto._id)}>
                Eliminar
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
      </table>

    </div>
  );
};

export default ProductSearch;
