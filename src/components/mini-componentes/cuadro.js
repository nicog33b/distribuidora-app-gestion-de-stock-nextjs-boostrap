import { SquaresPlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Square = ({ title, sign, value }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
    <div className="shadow rounded-lg p-6 bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{sign}{value}</p>
    </div>
  </div>
);

export default Square;