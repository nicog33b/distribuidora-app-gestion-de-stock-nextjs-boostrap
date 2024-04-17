import React, { useState, useEffect } from "react";
import Square from "./cuadro";

export default function InfoCuadros() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalVentasP, setTotalVentasP] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/api/transacciones")
      .then((response) => response.json())
      .then((data) => {
        // Filtrar las compras y sumar sus montos totales
        const compras = data.filter((transaccion) => transaccion.tipo === "compra");
        const totalMontoCompras = compras.reduce((total, transaccion) => total + transaccion.montoTotal, 0);
        setTotalCompras(totalMontoCompras);

        const compraP = data.filter((transaccion) => transaccion.tipo === "compraP");
        const totalCantidadComprasP = compraP.reduce((total, transaccion) => total + transaccion.montoTotal, 0);
        setTotalCompras(totalCompras+totalCantidadComprasP);



        

     // Filtrar las ventas y sumar sus montos totales
     const ventas = data.filter((transaccion) => transaccion.tipo === "venta");
     const totalMontoVentas = ventas.reduce((total, transaccion) => total + transaccion.montoTotal, 0);

     // Filtrar las ventas de tipo ventaP y sumar sus cantidades totales
     const ventasP = data.filter((transaccion) => transaccion.tipo === "ventaP");
     const totalCantidadVentasP = ventasP.reduce((total, transaccion) => total + transaccion.montoTotal, 0);

     // Filtrar las transacciones de tipo "entrada" y sumar sus montos totales
     const entradas = data.filter((transaccion) => transaccion.tipo === "entrada");
     const totalMontoEntradas = entradas.reduce((total, transaccion) => total + transaccion.montoTotal, 0);

     // Filtrar las transacciones de tipo "salida" y sumar sus montos totales
     const salidas = data.filter((transaccion) => transaccion.tipo === "salida");
     const totalMontoSalidas = salidas.reduce((total, transaccion) => total + transaccion.montoTotal, 0);

     // Calcular el total de ventas sumando las ventas, las ventas de tipo "ventaP" y las entradas,
     // y restando las salidas
     const totalVentasCalculado = totalMontoVentas + totalCantidadVentasP + totalMontoEntradas - totalMontoSalidas;

     // Actualizar el estado de totalVentas
     setTotalVentas(totalVentasCalculado);
  
      })
      .catch((error) => {
        console.error("Error al obtener las transacciones:", error);
      });
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener la lista de productos
    fetch("http://localhost:3001/api/productos/")
      .then((response) => response.json())
      .then((data) => {
        setTotalProductos(data.length); // Establecer la cantidad total de productos
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-around items-center">
      <Square title="Ventas" sign="$" value={totalVentas} />
      <Square title="Compras" sign="$" value={totalCompras} />
      <Square title="Productos" value={totalProductos} />
    </div>
  );
}
