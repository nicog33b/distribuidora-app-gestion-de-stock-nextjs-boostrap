import React from "react";
import Square from "./cuadro";

export default function InfoCuadros() {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Ventas" sign='$' subtext="1,000,000" />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Compras" sign='$' subtext="500,000" />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <Square text="Productos" subtext="102"/>
      </div>
    </div>
  );
}
