import React, { useState } from "react";
import Swal from "sweetalert2";
import UserSelectionComponent from "./mini-componentes/peopleSelectInSell";
import ProductSearch from "./mini-componentes/productSelectedInSell";

const NewSaleDate = () => {
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({});
  const [transactionComment, setTransactionComment] = useState("");
  const [transactionType, setTransactionType] = useState("venta"); // Estado para transactionType
  const [isTransactionPending, setIsTransactionPending] = useState(false); //para controlar la transacción en curso
 
 
 
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
    const {
      selectedUsersList,
      transactionDate,
      transactionTime,
      transactionType,
    } = userData;
    const { selectedProducts, montoTotal } = productData;

    const ventaTransactionData = {
      tipo: transactionType,
      fecha: transactionDate,
      hora: transactionTime,
      montoTotal: montoTotal,
      personas: selectedUsersList.map((user) => ({
        idPersona: user._id,
        nombre: user.nombre,
        telefono: user.telefono,
        empresa: user.empresa,
        email: user.email,
      })),
      tableFinal: selectedProducts.map((product) => ({
        productId: product.producto._id,
        nombre: product.producto.nombre,
        precioUnitario: product.producto.precioVenta,
        lots: Object.keys(product.cantidad).map((stockId) => ({
          stockId,
          cantidad: product.cantidad[stockId],
          fechaVencimiento: product.fechaVencimiento,
        })),
      })),
    };

    const compraTransactionData = {
      tipo: transactionType,
      fecha: transactionDate,
      hora: transactionTime,
      montoTotal: montoTotal,
      personas: selectedUsersList.map((user) => ({
        idPersona: user._id,
        nombre: user.nombre,
        telefono: user.telefono,
        empresa: user.empresa,
        email: user.email,
      })),
      tableFinal: selectedProducts.map((product) => ({
        productId: product.producto._id,
        nombre: product.producto.nombre,
        precioUnitario: product.producto.precioCompra,
        lots: selectedProducts.map((product) => ({
          productId: product.producto._id, // Asegúrate de usar product.producto._id
          cantidad: product.cantidad,
          fechaVencimiento: product.fechaVencimiento,
        }))
      })),
    };



   

 

    let transactionData = {}; // Inicializa un objeto para contener los datos de la transacción

    // Verifica el tipo de transacción y asigna los datos correspondientes
    if (transactionType === "compra") {
      transactionData = compraTransactionData;
    } else if (transactionType === "venta") {
      transactionData = ventaTransactionData;
    }

    try {
      setIsTransactionPending(true); // Establecer el estado como "en proceso"
      const response = await fetch("http://vps-3732767-x.dattaweb.com:82/api/transacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData), // Utiliza el objeto adecuado según el tipo de transacción
      });

      if (response.ok) {
        const data = await response.json();

        Swal.fire({
          title: 'Éxito',
          text: 'La transaccion ha sido creada con exito.',
          icon: 'success',

        });
        if (transactionType === "venta") {
          for (const product of ventaTransactionData.tableFinal) {
            for (const lot of product.lots) {
              try {
                const stockResponse = await fetch(
                  `http://vps-3732767-x.dattaweb.com:82/api/stock/${lot.stockId}`
                );
                if (stockResponse.ok) {
                  const stockData = await stockResponse.json();
                  if (stockData.length > 0) {
                    const currentStockTotal = stockData[0].stockTotal;

                    if (!isNaN(currentStockTotal)) {
                      const updatedStockTotal =
                        currentStockTotal - lot.cantidad;
                      lot.stockTotal = updatedStockTotal;
                      console.log("Lote actualizado:", updatedStockTotal);

                      // Realizar el PUT con el stockTotal actualizado
                      const updateStockResponse = await fetch(
                        `http://vps-3732767-x.dattaweb.com:82/api/stocks/${lot.stockId}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            stockTotal: updatedStockTotal, // Actualizar el stockTotal con el nuevo valor
                          }),
                        }
                      );

                      if (updateStockResponse.ok) {
                        const updatedLot = await updateStockResponse.json();
                        console.log("Lote actualizado:", updatedLot);
                      } else {
                        console.error(
                          "Error al actualizar el lote:",
                          updateStockResponse.status
                        );
                        // Manejo de errores
                      }
                    } else {
                      console.error(
                        "El valor del stock total no es un número válido."
                      );
                    }
                  } else {
                    console.error(
                      "No se encontraron datos de stock para el ID proporcionado."
                    );
                  }
                } else {
                  console.error(
                    "Error al obtener el stock:",
                    stockResponse.status
                  );
                  // Manejo de errores
                }
              } catch (error) {
                console.error("Error:", error);
                // Manejo de errores de red u otros errores
              }
            }
          }
        } else if (transactionType === "compra") {
          for (const lot of lotes.lots) { // Accede a la clave "lots" para iterar sobre los lotes
            try {
              const newStock = {
                productId: lot.productId,
                stockTotal: lot.cantidad,
                fechaVencimiento: lot.fechaVencimiento
              };
        
              const response = await fetch("http://vps-3732767-x.dattaweb.com:82/api/stocks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newStock),
              });
        
              if (response.ok) {
                Swal.fire({
                  title: 'Éxito',
                  text: 'Nuevos lotes de compra agregados con exito.',
                  icon: 'success',
                });
                const data = await response.json();

              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Error al seleccionar lotes.',
                  icon: 'error',
                });
              }

            } catch (error) {
              //MENSAJE DE ERROR EN LOTES DE RED
              Swal.fire({
                title: 'Error',
                text: 'Es posible que haya un error en la red.',
                icon: 'error',
              });

            }
          }
        }

window.location.reload()



      } else {
      //MENSAJE DE ERROR EN FETCH DE TRANSACCIONES
        Swal.fire({
          title: 'Error de transaccion.',
          text: 'Faltan datos para completar.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores de red u otros errores
    } finally {
      setIsTransactionPending(false); // Cambiar el estado de nuevo a "falso" después de la transacción
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

        <button
        disabled={isTransactionPending} // Deshabilitar el botón si la transacción está en curso
          onClick={handleTransactionPost}
          className="bg-green-300 rounded hover:bg-green-500 border-black ml-3 flex py-2 px-2 font-normal justify-end"
          
        >
          {isTransactionPending ? 'Procesando...' : 'Crear Transacción'}
        </button>
      </div>
    </div>
  );
};

export default NewSaleDate;
