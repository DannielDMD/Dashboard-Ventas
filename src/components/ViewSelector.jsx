import React from 'react';

const ViewSelector = ({ options, activeValue, onChange }) => {
  return (
    <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 w-fit h-fit backdrop-blur-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-2 px-5 py-2 rounded-[10px] text-[12px] font-black tracking-tight transition-all duration-300 ${
            activeValue === option.value
              ? 'bg-white text-blue-600 shadow-lg shadow-blue-900/10'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
          }`}
        >
          {option.icon && (
            <span className="w-3.5 h-3.5 flex items-center justify-center">
              {option.icon}
            </span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;
