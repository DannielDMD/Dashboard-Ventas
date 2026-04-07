import React from 'react';

const Card = ({ label, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-5 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</span>
      <span className="text-2xl font-black text-gray-800">{value}</span>
    </div>
  );
};

export default Card;
