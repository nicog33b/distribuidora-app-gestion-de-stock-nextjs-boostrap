import React, { useState } from 'react';
import UserSelectionComponent from './mini-componentes/peopleSelectInSell';
import ProductSearch from './mini-componentes/productSelectedInSell';

const NewSaleDate = () => {
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({});
  const [transactionComment, setTransactionComment] = useState('');
  const [transactionType, setTransactionType] = useState('venta'); // Estado para transactionType



  const handleUserDataChange = (data) => {
    setUserData(data);
  };

  const handleProductDataChange = (data) => {
    setProductData(data);
  };

  const handleCommentChange = (e) => {
    setTransactionComment(e.target.value);
  };

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
  };



  const handleTransactionPost = async () => {
    const { selectedUsersList, transactionDate, transactionTime, transactionType } = userData;
    const { selectedProducts, montoTotal } = productData;

    const ventaTransactionData = {
      tipo: transactionType,
      fecha: transactionDate,
      hora: transactionTime,
      montoTotal: montoTotal,
      personas: selectedUsersList.map(user => ({
        idPersona: user._id,
        nombre: user.nombre,
        telefono: user.telefono,
        empresa: user.empresa,
        email: user.email
      })),
      tableFinal: selectedProducts.map(product => ({
        productId: product.producto._id,
        nombre: product.producto.nombre,
        precioUnitario: product.producto.precioVenta,
        lots: Object.keys(product.cantidad).map(stockId => ({
          stockId,
          cantidad: product.cantidad[stockId],
          fechaVencimiento: product.fechaVencimiento
        }))
      })),
    };

    const compraTransactionData = {
      tipo: transactionType,
      fecha: transactionDate,
      hora: transactionTime,
      montoTotal: montoTotal,
      personas: selectedUsersList.map(user => ({
        idPersona: user._id,
        nombre: user.nombre,
        telefono: user.telefono,
        empresa: user.empresa,
        email: user.email
      })),
      tableFinal: selectedProducts.map(product => ({
        productId: product.producto._id,
        nombre: product.producto.nombre,
        precioUnitario: product.producto.precioCompra,
        lots:{
          cantidad: product.cantidad,
          fechaVencimiento: product.fechaVencimiento
        }
      })),
    };

    console.log(ventaTransactionData)
    
    let transactionData = {}; // Inicializa un objeto para contener los datos de la transacción

    // Verifica el tipo de transacción y asigna los datos correspondientes
    if (transactionType === 'compra') {
      transactionData = compraTransactionData;
    } else if (transactionType === 'venta') {
      transactionData = ventaTransactionData;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData), // Utiliza el objeto adecuado según el tipo de transacción
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Transacción creada:', data);

      //Crear lotes 

      

      if (transactionType === 'compra') {
       
        compraTransactionData
      } else if (transactionType === 'venta') {
        ventaTransactionData
      }



        window.location.reload();
      } else {
        console.error('Error al crear la transacción:', response.status);
        // Manejo de errores
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejo de errores de red u otros errores
    }
  };

  return (
    <div className="w-full mx-auto p-8">
      <div className="flex items-center mt-4">
        {/* Botón para volver a las transacciones */}
      </div>

      <UserSelectionComponent
  onUserDataChange={handleUserDataChange}
  onTransactionTypeChange={handleTransactionTypeChange}
/>
      <ProductSearch
        onProductDataChange={handleProductDataChange}
        transactionType={transactionType} // Pasar transactionType como prop al ProductSearch
      />

      {/* Botón para confirmar la creación de la transacción */}
      <div className="mt-4 flex">
        <input
          className="w-6/12 flex justify-center h-10 p-2 rounded border"
          type="text"
          placeholder="Agregar Comentario a la Transacción"
          value={transactionComment}
          onChange={handleCommentChange}
        />

        <button onClick={handleTransactionPost} className='bg-green-300 rounded hover:bg-green-500 border-black ml-3 flex py-2 px-2 font-normal justify-end'>Crear Transacción</button>
      </div>
    </div>
  );
};

export default NewSaleDate;
