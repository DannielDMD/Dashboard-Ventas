import React from 'react';

const Card = ({ label, value, type = 'default', percentageValue }) => {
  const getStyles = () => {
    switch (type) {
      case 'ventas':
        return {
          container: 'bg-blue-50/70 border-blue-100 shadow-blue-900/5',
          label: 'text-blue-500',
          value: 'text-blue-700',
          percent: 'text-blue-400 bg-blue-100/50'
        };
      case 'instalado':
        return {
          container: 'bg-emerald-50/70 border-emerald-100 shadow-emerald-900/5',
          label: 'text-emerald-500',
          value: 'text-emerald-700',
          percent: 'text-emerald-400 bg-emerald-100/50'
        };
      case 'pendiente':
        return {
          container: 'bg-amber-50/70 border-amber-100 shadow-amber-900/5',
          label: 'text-amber-500',
          value: 'text-amber-700',
          percent: 'text-amber-400 bg-amber-100/50'
        };
      case 'descartado':
        return {
          container: 'bg-rose-50/70 border-rose-100 shadow-rose-900/5',
          label: 'text-rose-500',
          value: 'text-rose-700',
          percent: 'text-rose-400 bg-rose-100/50'
        };
      case 'oportunidad':
        return {
          container: 'bg-purple-50/70 border-purple-100 shadow-purple-900/5',
          label: 'text-purple-500',
          value: 'text-purple-700',
          percent: 'text-purple-400 bg-purple-100/50'
        };
      case 'digital':
        return {
          container: 'bg-cyan-50/70 border-cyan-100 shadow-cyan-900/5',
          label: 'text-cyan-500',
          value: 'text-cyan-700',
          percent: 'text-cyan-400 bg-cyan-100/50'
        };
      case 'meta':
        return {
          container: 'bg-indigo-600 border-indigo-700 shadow-indigo-900/20 text-white',
          label: 'text-indigo-100',
          value: 'text-white',
          percent: 'text-white/60 bg-white/10'
        };
      default:
        return {
          container: 'bg-white border-gray-100 shadow-slate-900/5',
          label: 'text-slate-400',
          value: 'text-slate-800',
          percent: 'text-slate-400 bg-slate-50'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.container} rounded-xl border p-3 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg w-full mx-auto justify-between h-full`}>
      <div className="w-full flex-1 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span className={`${styles.label} text-xs font-black uppercase tracking-wider line-clamp-1 opacity-80`}>
            {label}
          </span>
          {percentageValue && (
            <span className={`${styles.percent} text-[10px] font-black px-2 py-0.5 rounded-full leading-none inline-block`}>
              {percentageValue}
            </span>
          )}
        </div>
      </div>
      
      <span className={`${styles.value} text-xs font-black tabular-nums leading-none mt-2`}>
        {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
      </span>
    </div>
  );
};

export default Card;
