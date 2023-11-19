import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const AddStock = ({ isOpen, closeModal, product }) => {
  const [stockTotal, setStockTotal] = useState(0);
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [nombre, setNombre] = useState(''); // Nuevo campo para identificar el lote


 // useEffect para imprimir en la consola los valores de product al iniciar el modal
 useEffect(() => {
  console.log("Product al iniciar el modal:", product);
}, [product]);


  const handleStockSubmit = async (event) => {
    
    event.preventDefault();
  
    const newStock = {
      productId: product._id,
      stockTotal: parseInt(stockTotal),
      fechaVencimiento,
      nombre, // Incorporar el nombre del lote
    };
  
    try {
      const response = await fetch('http://vps-3732767-x.dattaweb.com:82/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStock),
      });
  
      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Nuevo stock agregado exitosamente',
          icon: 'success',
        }).then(() => {
          
          closeModal();
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al agregar el stock',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al agregar stock:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al agregar el stock',
        icon: 'error',
      });
    }
  };

 //@author: Nico

 const handleBuySubmit = async (event) => {
  event.preventDefault();

  // Verificar si el producto y su precio de compra están definidos
  if (!product || !product.precioCompra) {
    console.error('Error: product o product.precioCompra no están definidos');
    return;
  }

  // Calcular el monto total multiplicando stockTotal por precioCompra
  const montoTotal = stockTotal * product.precioCompra;

  const newStock = {
    productId: product._id,
    stockTotal: parseInt(stockTotal),
    fechaVencimiento,
    nombre, // Incorporar el nombre del lote
  };

  try {
    // Primero, enviar el nuevo stock a api/stocks
    const stockResponse = await fetch('http://vps-3732767-x.dattaweb.com:82/api/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStock),
    });


    if (stockResponse.ok) {



       // Obtener la fecha y hora actual
       const currentDate = new Date();
       const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
       const formattedTime = currentDate.toTimeString().split(' ')[0]; // Formato HH:mm:ss

       
      // Si la solicitud a api/stocks es exitosa, entonces realizar la solicitud a api/transacciones
      const compraTransactionData = {
        tipo: 'compraP',
        fecha: formattedDate,
        hora: formattedTime,
        montoTotal: montoTotal,
        personas: [],
        tableFinal: {
          productId: product._id,
          nombre: product.nombre,
          precioUnitario: product.precioCompra,
          lots: {
            productId: newStock.productId,
            cantidad: newStock.stockTotal,
            fechaVencimiento: newStock.fechaVencimiento,
          },
        },
      };

      const transaccionResponse = await fetch('http://vps-3732767-x.dattaweb.com:82/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compraTransactionData),
      });

      if (transaccionResponse.ok) {
        // Ambas solicitudes fueron exitosas
        Swal.fire({
          title: 'Éxito',
          text: 'Nueva transacción de compra agregada exitosamente',
          icon: 'success',
        }).then(() => {
          closeModal();
          window.location.reload();
        });
      } else {
        // Error en la solicitud a api/transacciones
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al agregar la transacción de compra',
          icon: 'error',
        });
      }
    } else {
      // Error en la solicitud a api/stocks
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al agregar el nuevo stock',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error al agregar stock o transacción de compra:', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al agregar el stock o la transacción de compra',
      icon: 'error',
    });
  }
};

                                                                                                                                                                                                                                                                                                               


  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-end">
            <button onClick={closeModal} className="text-gray-600">
              &times;
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Agregar Stock</h2>
          <form onSubmit={handleStockSubmit}>
            <div className="mb-4">
              <label htmlFor="stockTotal" className="block text-gray-700 text-sm font-bold mb-2">Stock Total:</label>
              <input
                type="number"
                id="stockTotal"
                value={stockTotal}
                onChange={(e) => setStockTotal(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fechaVencimiento" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento:</label>
              <input
                type="date"
                id="fechaVencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center mt-4 ">
              <button onClick={handleStockSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">Agregar Stock</button>
              <buttonon onClick={handleBuySubmit}  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Agregar Compra</buttonon>
            </div>
          </form>

          

        </div>
        
      </div>
    </div>
  );
};

export default AddStock;
