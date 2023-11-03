import React, { useState, useEffect } from 'react';
import LoteProductModal from '../mini-componentes/editTables/addLoteProduct'; // Importar el componente del modal de lote'
import EditStockModal from './editTables/editStockModal';
import Swal from 'sweetalert2'; // Importar SweetAlert
import { TrashIcon } from '@heroicons/react/24/solid';

const ProductSearch = ({onProductDataChange, transactionType, }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tableProductsStocks, setTableProductsStocks] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0); // Estado para el monto total
  const [editStockModalIsOpen, setEditStockModalIsOpen] = useState(false); // Estado del modal de edición de stock
  const [productId, setProductId] = useState(null); // Estado para almacenar el productId

  useEffect(() => {
    if (selectedProducts.length > 0) {
      if (transactionType === 'compra') {
        setSelectedProducts([]);
        setTableProductsStocks([]);
      } else if (transactionType === 'venta') {
        setSelectedProducts([]);
        setTableProductsStocks([]);
      }
    }
  }, [transactionType]);

  const agregarProductoCompra = (cantidad, fechaVencimiento) => {
    // Check if the selected product is already in the selected products list
    const isProductInSelected = selectedProducts.some(
      (product) => product.producto._id === selectedProduct._id
    );
  
    if (isProductInSelected) {
      Swal.fire({
        icon: 'error',
        title: 'Producto existente',
        text: 'Este producto ya ha sido agregado',
      });


      return;
      
    } else {
      // If the product doesn't exist, add it to the selected products list
      setSelectedProducts([
        ...selectedProducts,
        {
          producto: selectedProduct,
          cantidad: cantidad,
          fechaVencimiento: fechaVencimiento
        },
      ]);
    }
  };
  



   // Lógica para actualizar el monto total cuando cambian los productos seleccionados
   useEffect(() => {
    const total = calculateTotalPrice();
    setMontoTotal(total);
  }, [selectedProducts]);

  const handleDataChange = () => {
    onProductDataChange({
      selectedProducts,
      tableProductsStocks,
      montoTotal,
    });
   
  };

  useEffect(() => {
    handleDataChange();
  }, [selectedProducts, tableProductsStocks, montoTotal]);

  const calculateProductTotal = (product) => {
    const totalQuantity = Object.keys(product.cantidad).reduce(
      (acc, lotId) => acc + product.cantidad[lotId],
      0
    );
    return product.producto.precioVenta * totalQuantity;
  };
  
  // Calcula el precio total de todos los productos
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      if (transactionType === 'compra') {
        totalPrice += product.cantidad * product.producto.precioCompra; // Multiplica cantidad por precio unitario
      } else {
        totalPrice += calculateProductTotal(product);
      }
    });
    return totalPrice;
  };

  const agregarProducto = (selectedProduct, selectedLots) => {
    const existingProductIndex = selectedProducts.findIndex(
      (product) => product.producto._id === selectedProduct._id
    );

     // Verificar si el producto ya está en tableProductsStocks
     const isProductInStocks = tableProductsStocks.some(
      (item) => item.productId === selectedProduct._id
    );

    if (isProductInStocks) {
 
      Swal.fire({
        icon: 'error',
        title: 'Producto existente',
        text: 'Este producto ya ha sido agregado',
      });


      return;
    }


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
  
    // Actualizar tableProductsStocks
    setTableProductsStocks((prevTableProductsStocks) => [
      ...prevTableProductsStocks,
      {
        productId: selectedProduct._id,
        lots: Object.keys(selectedLots).map((lotId) => ({
          stockId: lotId,
          cantidad: selectedLots[lotId],
        })),
      },
    ]);
  };
  
  
  const eliminarProducto = (productId) => {

    console.log(tableProductsStocks)
    const updatedTableProductsStocks = tableProductsStocks.filter(
      (item) => item.productId !== productId
    );
  
    setTableProductsStocks(updatedTableProductsStocks);
  
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
    setSelectedProduct(selectedProduct);

    if (transactionType === 'venta') {
      setModalIsOpen(true);
    } else if (transactionType === 'compra') {
      setEditStockModalIsOpen(true); // Abre el modal de edición de stock
      setProductId(selectedProduct._id);
    }
  };
  
  const closeEditStockModal = () => {
    setEditStockModalIsOpen(false); // Cierra el modal de edición de stock
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
            <div className='font-semibold'>Precio: $  {transactionType === 'compra' ? product.precioCompra : product.precioVenta} </div>
          </div>
        ))}
      </div>



  
      {/* Tu código existente */}

      {/* Modal de LoteProductModal */}
      {modalIsOpen && (
        <LoteProductModal
          isOpen={modalIsOpen}
          product={selectedProduct}
          closeModal={closeLoteModal}
          agregarProducto={agregarProducto}
        />
      )}

      {/* Modal de EditStockModal */}
      {editStockModalIsOpen && (
     <EditStockModal
     isOpen={editStockModalIsOpen}
     closeModal={closeEditStockModal}
      agregarProductoCompra={agregarProductoCompra} // Asegúrate de utilizar el nombre de prop correcto
   />
      )}

      {/* Tu código existente */}
    

<table className="w-full border-collapse border border-black mt-4">
  <thead>
    <tr className='bg-green-50'>
      <th className="border border-gray-400 p-2">ID</th>
      <th className="border border-gray-400 p-2">Nombre</th>
      <th className="border border-gray-400 p-2">Unitario</th>
      <th className='border border-gray-400 p-2'>Unidades</th>
      <th className='border border-gray-400 p-2'>Total</th>
      <th className="border border-gray-400 p-2">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(selectedProducts).map((productId) => {
      const product = selectedProducts[productId];
      const totalQuantity = Object.keys(product.cantidad).reduce((acc, lotId) => acc + product.cantidad[lotId], 0);

      return (
        <tr className=' border-black' key={product.producto._id}>
          <td className="border p-2">{product.producto._id}</td>
          <td className="border p-2">{product.producto.nombre}</td>
          <td className="border p-2">
  {transactionType === 'compra' ? product.producto.precioCompra.toString() : product.producto.precioVenta.toString()}
</td>

          <td className="border p-2">
  {transactionType === 'compra' ? product.cantidad  : totalQuantity}
</td>

          <td className='border p-2'>${transactionType === 'compra' ? product.producto.precioCompra * product.cantidad : product.producto.precioVenta * totalQuantity}</td>
          <td className='border p-2 flex justify-center items-center'>
  <TrashIcon
    className="h-5 w-5 text-red-600 cursor-pointer"
    onClick={() => eliminarProducto(product.producto._id)}
  />
</td>
         
        </tr>
      );
    })}
  </tbody>
</table>


      <table className="w-2/12 border-collapse border ms-auto border-black mt-4">
      <thead>
        <tr className='rounded bg-green-50'>
          <th className="border border-gray-400">Precio Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td className="border border-gray-400">${calculateTotalPrice()}</td>
        </tr>
      </tbody>
    </table>



    </div>
  );
};

export default ProductSearch;
