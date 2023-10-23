import React from "react";
import './css/main.css';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SalesTable from "@/components/salesTable";
import CrearVenta from "@/components/crearVenta";

const Sales = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 bg-white w-full lg:w-3/4 xl:w-4/5 mx-auto overflow-x-auto">
          <CrearVenta></CrearVenta>
        </div>
      </div>
    </div>
  );
};

export default Sales;
