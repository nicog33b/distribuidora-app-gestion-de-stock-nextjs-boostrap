import React, { useState, useEffect } from 'react';
import LoteProductModal from '../mini-componentes/editTables/addLoteProduct'; // Importar el componente del modal de lote

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Agregar estado para controlar el modal de lote

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

  const openLoteModal = (productName) => {
    setSelectedProduct(productName);
    setModalIsOpen(true); // Abrir el modal al hacer clic en un producto
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
          <div key={product._id} className="border rounded p-2 text-center hover:border-green-900" onClick={() => openLoteModal(product.nombre)}>
            <img src={product.imagenURL} alt={product.nombre} className="w-16 h-16 object-cover mb-2 mx-auto" />
            <div className='text-lg font-bold'>{product.nombre}</div>
            <div className='font-semibold'>Tipo: {product.tipo}</div>
            <div className='font-semibold'>Precio: ${product.precioVenta}</div>
          </div>
        ))}
      </div>

      {/* Modal de lote */}
      <LoteProductModal isOpen={modalIsOpen} product={selectedProduct} closeModal={closeLoteModal} />
    </div>
  );
};

export default ProductSearch;
