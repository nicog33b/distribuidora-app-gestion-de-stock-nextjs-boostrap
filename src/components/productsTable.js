import React, { useState, useEffect } from "react";
import EditStockModal from "./mini-componentes/editTables/editStockModal";
import AddProductModal from "./mini-componentes/addProductModal";
import AddTypeModal from "./mini-componentes/addTypeModal";
import EditProductModal from "./mini-componentes/editTables/editProductModal";

import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  ClipboardIcon,
  ShareIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/solid";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddTypeModalOpen, setAddTypeModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditStockModalOpen, setEditStockModalOpen] = useState(false);
  const [selectedProductIdForStock, setSelectedProductIdForStock] = useState(null);


  const openEditStockModal = (productId) => {
    setSelectedProductIdForStock(productId);
    setEditStockModalOpen(true);
  };

  const closeEditStockModal = () => {
    setEditStockModalOpen(false);
  };

  const openAddTypeModal = () => {
    setAddTypeModalOpen(true);
  };

  const closeAddTypeModal = () => {
    setAddTypeModalOpen(false);
  };

  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setEditProductModalOpen(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Texto copiado al portapapeles");
    } catch (err) {
      console.error("Error al copiar el texto: ", err);
    }
  };


  const getStocksForProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/stocks/${productId}`);
      if (response.ok) {
        const data = await response.json();
        const stockTotal = data.reduce((total, stock) => total + stock.stockTotal, 0);
        return stockTotal;
      } else {
        console.error("Error al recuperar los stocks para el producto");
        return 0;
      }
    } catch (error) {
      console.error("Error al recuperar los stocks para el producto:", error);
      return 0;
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/productos");
      if (response.ok) {
        const data = await response.json();
        const productsWithTotalStock = await Promise.all(data.map(async (product) => {
          const totalStock = await getStocksForProduct(product._id);
          return { ...product, stockTotal: totalStock }; // Agrega el stock total al producto
        }));
        setProducts(productsWithTotalStock);
        setFilteredProducts(productsWithTotalStock);
      } else {
        console.error("Error al cargar los productos desde la API");
      }
    } catch (error) {
      console.error("Error al cargar los productos desde la API:", error);
    }
  };



  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/productos/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        loadProducts();
      } else {
        console.error("Error al eliminar el producto desde la API");
      }
    } catch (error) {
      console.error("Error al eliminar el producto desde la API:", error);
    }
  };


  useEffect(() => {
    loadProducts();
  }, []);



  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const searchResults = products.filter((product) => {
      return (
        product._id.includes(searchTerm) ||
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchResults);
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar productos"
            className="p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="m-2">
            <button
              onClick={openAddProductModal}
              className="bg-green-500 text-white p-2 rounded"
            >
              <PlusIcon className="h-4 w-4 " />
            </button>
            <AddProductModal
              isOpen={isAddProductModalOpen}
              closeModal={closeAddProductModal}
            />
          </div>
          <div className="m-2">
            <button
              onClick={openAddTypeModal}
              className="bg-black text-white p-2 rounded"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <AddTypeModal
              isOpen={isAddTypeModalOpen}
              closeModal={closeAddTypeModal}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-1">Nombre</th>
              <th className="p-1">Tipo</th>
              <th className="p-1">Precio</th>
              <th className="p-1">Stock</th>
              <th className="p-1">Imagen</th>
              <th className="p-1">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="p-1 border text-center font-serif border-gray-300">
                  {product.nombre}
                </td>
                <td className="p-1 border text-center font-serif border-gray-300">
                  {product.tipo}
                </td>
                <td className="p-1 border text-center font-serif border-gray-300">
                  {`$${product.precioVenta}`}
                </td>
                <td className="p-1 border text-center font-serif border-gray-300">
                {product.stockTotal}
            </td>
                <td className="p-1 border border-gray-300 text-center">
                  <img
                    src={product.imagenURL}
                    alt={product.nombre}
                    className="w-16 h-16 mx-auto my-auto"
                  />
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-lg m-1"
                    onClick={() => openEditProductModal(product)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg m-1"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded-lg m-1"
                    onClick={() => openEditStockModal(product._id)}
                  >
                    <ClipboardIcon className="h-4 w-4" />
                  </button>
                    <button className="bg-amber-800 text-white p-2 rounded-lg m-1">
                    <ShareIcon
                      className="h-4 w-4"
                      onClick={() => copyToClipboard(product._id)}
                    />
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


{/*
 ----------------- MODALS ------------------------
*/}
      <EditProductModal
        isOpen={isEditProductModalOpen}
        closeModal={closeEditProductModal}
        product={selectedProduct}
        onEditProduct={(editedProduct) => {
          console.log("Producto editado:", editedProduct);
          loadProducts();
        }}
      />
    <EditStockModal
  isOpen={isEditStockModalOpen}
  closeModal={closeEditStockModal}
  productId={selectedProductIdForStock} // Asegúrate de que aquí esté pasando el productId
/>



      
    </div>   

  );
};

export default ProductTable;
