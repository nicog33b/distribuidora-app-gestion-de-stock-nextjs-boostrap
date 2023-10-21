import React from 'react';

import InfoCuadros from './mini-componentes/infoCuadros';
import BarChart from './graficas/barChart';

const Metrics = () => {
  return (


<div className='py-12'>
<InfoCuadros></InfoCuadros>

<div className='flex justify-center items-center '>
    <div className='flex w-5/12 m-3 p-2'>
      <BarChart ></BarChart>
    </div>
    <div className='flex w-5/12 m-3 p-2'>
    <BarChart ></BarChart>
    </div>
    </div>
</div>
  );
};

export default Metrics;
