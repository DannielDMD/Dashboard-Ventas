import React from 'react';

const ViewSelector = ({ options, activeValue, onChange }) => {
  return (
    <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 w-fit h-fit backdrop-blur-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-[10px] text-xs font-bold tracking-tight transition-all duration-300 ${activeValue === option.value
              ? 'bg-white text-black-700 shadow-[0_4px_12px_-4px_rgba(30,64,175,0.2)] border border-blue-50'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
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
