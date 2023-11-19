import React from 'react';

import { UserIcon,CubeIcon,CurrencyDollarIcon, ChartBarSquareIcon,Cog6ToothIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  return (
    <div className="bg-amber-700 text-white w-16 min-h-screen shadow-sm shadow-black border border-amber-900">
      <ul className="space-y-2">
        <li><a href="/" className="p-6 block rounded hover:bg-amber-600 text-center justify-center"> <ChartBarSquareIcon className='w-4 h-4'></ChartBarSquareIcon> </a></li>
        <li><a href="/products" className="p-6 block rounded hover:bg-amber-600"> <CubeIcon className='w-4 h-4'></CubeIcon> </a></li>
        <li><a href="/ventas" className="p-6 block rounded hover:bg-amber-600"> <CurrencyDollarIcon className='w-4 h-4'></CurrencyDollarIcon> </a></li>
        <li><a href="/contact" className="p-6 block rounded hover:bg-amber-600 "> <UserIcon className='w-4 h-4'></UserIcon>  </a></li>
        <li><a href="/config" className="p-6 block rounded hover:bg-amber-600"> <Cog6ToothIcon className='h-4 w-4' /> </a></li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
