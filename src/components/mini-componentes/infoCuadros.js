import React, { useState, useEffect } from "react";
import Square from "./cuadro";

export default function InfoCuadros() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalVentasP, setTotalVentasP] = useState(0);

  useEffect(() => {
    fetch("http://vps-3732767-x.dattaweb.com:82/api/transacciones")
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
    fetch("http://vps-3732767-x.dattaweb.com:82/api/productos/")
      .then((response) => response.json())
      .then((data) => {
        setTotalProductos(data.length); // Establecer la cantidad total de productos
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Ventas" sign="$" subtext={totalVentas} />
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Compras" sign="$" subtext={totalCompras} />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Productos" subtext={totalProductos} />
      </div>
    </div>
  );
}
