import React from 'react';

const Square = ({ text, subtext,sign }) => {
  return (
    <div className="w-42 h-16   bg-slate-300 flex flex-col items-center justify-between rounded-md">
      <div className="mb-1 text-white font-serif  text-lg">{text}</div>
      <div><span className=' text-green-600'>{sign}</span>{subtext}</div>
    </div>
  );
};

export default Square;
