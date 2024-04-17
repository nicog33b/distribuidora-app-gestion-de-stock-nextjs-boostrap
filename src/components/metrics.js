import React from 'react';
import InfoCuadros from './mini-componentes/infoCuadros';
import BarChart from './graficas/barChart';

const Metrics = () => {
  return (
    <div className='py-12 bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4'>
        <h1 className='text-xl font-serif text-center mb-6'>Dashboard de Métricas</h1>
        <InfoCuadros />

        <div className='flex flex-wrap justify-around items-center mt-6'>
          <div className='box-border p-4 shadow-lg rounded-lg bg-white m-3 flex-auto'>
            <BarChart />
          </div>
          <div className='box-border p-4 shadow-lg rounded-lg bg-white m-3 flex-auto'>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;