import React, {useState, useEffect} from "react";
import Square from "./cuadro";




export default function InfoCuadros() {
  const  [totalProductos, setTotalProductos] = useState(0)
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/transacciones")
      .then(response => response.json())
      .then(data => {
        // Filtrar las compras y sumar sus montos totales
        const compras = data.filter(transaccion => transaccion.tipo === "compra");
        const totalMontoCompras = compras.reduce((total, transaccion) => total + transaccion.montoTotal, 0);
        setTotalCompras(totalMontoCompras);

        // Filtrar las ventas y sumar sus montos totales
        const ventas = data.filter(transaccion => transaccion.tipo === "venta");
        const totalMontoVentas = ventas.reduce((total, transaccion) => total + transaccion.montoTotal, 0);
        setTotalVentas(totalMontoVentas);
    
      })
      .catch(error => {
        console.error("Error al obtener las transacciones:", error);
      });
  }, []);

  

  useEffect(() => {
    // Llamada a la API para obtener la lista de productos
    fetch("http://localhost:3000/api/productos/")
      .then(response => response.json())
      .then(data => {
        setTotalProductos(data.length); // Establecer la cantidad total de productos
      })
      .catch(error => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Ventas" sign='$' subtext={totalVentas} />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Compras" sign='$' subtext={totalCompras} />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Productos" subtext={totalProductos}/>
      </div>
    </div>
  );
}
