import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import Swal from "sweetalert2";

const CreateSaleModal = ({ isOpen, closeModal, product }) => {
  const [selectedLots, setSelectedLots] = useState({});
  const [saleData, setSaleData] = useState({});
  const [lots, setLots] = useState([]);

  const handleCreateSale = async () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format("YYYY-MM-DD");
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const montoTotal = Object.values(selectedLots).reduce((total, cantidad) => {
      const subtotal = cantidad * product.precioVenta;
      return total + subtotal;
    }, 0);

    const updatedLots = lots.map((lot) => {
      const selectedQuantity = selectedLots[lot._id] || 0;
      const updatedStockTotal = lot.stockTotal - selectedQuantity;
      return {
        ...lot,
        stockTotal: updatedStockTotal,
      };
    });
   



    const updatedIndividualSaleData = {
      tipo: "ventaP",
      fecha: formattedDate,
      hora: formattedTime,
      montoTotal: montoTotal,
      personas: [],
      tableFinal: [
        {
          productId: product._id,
          nombre: product.nombre,
          precioUnitario: product.precioVenta,
          lots: updatedLots.map(({ _id, stockTotal, fechaVencimiento }) => ({
            productId: product._id,
            cantidad: selectedLots[_id] || 0,
            fechaVencimiento,
          })),
        },
      ],
    };


   const lotes = updatedLots
  .filter(({ _id, stockTotal, fechaVencimiento }) => selectedLots[_id] !== undefined)
  .map(({ _id, stockTotal, fechaVencimiento }) => ({
    stockId: _id,
    productId: product._id,
    cantidad: selectedLots[_id] ,
    stockTotal: stockTotal,
    fechaVencimiento,
  }));





  try {
    const response = await fetch("http://vps-3732767-x.dattaweb.com:82/api/transacciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIndividualSaleData),
    });
  
    if (!response.ok) {
      Swal.fire({
        title: 'Error',
        text: 'Hemos tenido problemas para crear venta.',
        icon: 'error',
      });
      throw new Error("Error al realizar la solicitud POST");
    }
  
    // Obtén los IDs de los stocks que necesitas actualizar
    const stockIdsToUpdate = lotes.map(lote => lote.stockId);
  
    // Realiza las solicitudes PUT para actualizar el stock
    await Promise.all(stockIdsToUpdate.map(async stockId => {
      const stockToUpdate = lotes.find(lote => lote.stockId === stockId);
      const stockUpdateResponse = await fetch(`http://vps-3732767-x.dattaweb.com:82/api/stocks/${stockId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stockTotal: stockToUpdate.stockTotal,
        }),
      });
  
      if (!stockUpdateResponse.ok) {
        throw new Error(`Error al actualizar el stock con ID ${stockId}`);
      }
    }));
  
    console.log(updatedLots);
    console.log(lotes);
  
    // Resto de tu lógica después de un exitoso POST...
  
    Swal.fire({
      title: 'Éxito',
      text: 'Venta de producto exitosa',
      icon: 'success',
    });


    // Limpiar el estado o realizar otras acciones después de un exitoso POST
    setSelectedLots({});
    closeModal()
    window.location.reload();
  } catch (error) {
    console.error("Error al enviar la transacción:", error);
  }

  }; //final de funcion crear venta de producto

  const handleInputChange = (e, lotId) => {
    const { value } = e.target;
    const maxStock = lots.find((lot) => lot._id === lotId).stockTotal;
    const parsedValue = parseInt(value, 10) || 0;
  
    // Asegúrate de que solo las cantidades mayores a 0 se almacenen en selectedLots
    if (parsedValue > 0) {
      setSelectedLots((prevLots) => ({
        ...prevLots,
        [lotId]: parsedValue > maxStock ? maxStock : parsedValue,
      }));
    } else {
      // Si la cantidad es 0, elimina la entrada correspondiente en selectedLots
      setSelectedLots((prevLots) => {
        const newLots = { ...prevLots };
        delete newLots[lotId];
        return newLots;
      });
    }
  };


  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await fetch(`http://vps-3732767-x.dattaweb.com:82/api/stocks/${product._id}`);
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de stock");
        }
        const data = await response.json();
        setLots(data);
      } catch (error) {
        console.error("Error al obtener los lotes de stock:", error);
      }
    };

    if (isOpen) {
      fetchLots();
    }
  }, [product, isOpen]);




  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Crear Venta"
      className="modal fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Venta individual
          </h2>
          <hr></hr>
          <div className="mb-4">
            <div className="mb-4 overflow-auto max-h-80">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4">Stock Total</th>
                    <th className="py-2 px-4">Fecha de Vencimiento</th>
                    <th className="py-2 px-4">Seleccionar</th>
                  </tr>
                </thead>
                 <tbody>
          {lots && lots.map((lot) => (
            <tr key={lot._id} className="bg-white text-gray-700">
              <td className="py-2 px-4">{lot.stockTotal}</td>
              <td className="py-2 px-4">
                {new Date(lot.fechaVencimiento).toLocaleDateString("es-ES")}
              </td>
              <td className="py-2 px-4">
                <input
                  className="w-16 py-1 border rounded-md"
                  type="number"
                  min="0"
                  max={lot.stockTotal}
                  value={selectedLots[lot._id] || 0}
                  onChange={(e) => handleInputChange(e, lot._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
              </table>
            </div>
            <div className="mt-4 border p-3 flex justify-center">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
              >
                Cerrar
              </button>
              <button
                onClick={handleCreateSale}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
              >
                Agregar producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSaleModal;
