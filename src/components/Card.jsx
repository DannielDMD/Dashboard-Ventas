import React from 'react';

const Card = ({ label, value, type = 'default', percentageValue }) => {
  const getStyles = () => {
    switch (type) {
      case 'ventas':
        return {
          container: 'bg-blue-50/80 border-blue-200 shadow-blue-500/5',
          label: 'text-blue-600',
          value: 'text-blue-900',
          percent: 'text-blue-700 bg-blue-100'
        };
      case 'instalado':
        return {
          container: 'bg-emerald-50/80 border-emerald-200 shadow-emerald-500/5',
          label: 'text-emerald-600',
          value: 'text-emerald-900',
          percent: 'text-emerald-700 bg-emerald-100'
        };
      case 'pendiente':
        return {
          container: 'bg-amber-50/80 border-amber-200 shadow-amber-500/5',
          label: 'text-amber-600',
          value: 'text-amber-900',
          percent: 'text-amber-700 bg-amber-100'
        };
      case 'descartado':
        return {
          container: 'bg-rose-50/80 border-rose-200 shadow-rose-500/5',
          label: 'text-rose-600',
          value: 'text-rose-900',
          percent: 'text-rose-700 bg-rose-100'
        };
      case 'oportunidad':
        return {
          container: 'bg-purple-50/80 border-purple-200 shadow-purple-500/5',
          label: 'text-purple-600',
          value: 'text-purple-900',
          percent: 'text-purple-700 bg-purple-100'
        };
      case 'digital':
        return {
          container: 'bg-cyan-50/80 border-cyan-200 shadow-cyan-500/5',
          label: 'text-cyan-600',
          value: 'text-cyan-900',
          percent: 'text-cyan-700 bg-cyan-100'
        };
      case 'meta':
        return {
          container: 'bg-gradient-to-br from-indigo-600 to-blue-700 border-indigo-700 shadow-indigo-500/30 text-white',
          label: 'text-indigo-100',
          value: 'text-white',
          percent: 'text-white/80 bg-white/20'
        };
      default:
        return {
          container: 'bg-white border-slate-200 shadow-slate-500/5',
          label: 'text-slate-500',
          value: 'text-slate-900',
          percent: 'text-slate-600 bg-slate-100'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.container} rounded-xl border p-2.5 md:p-3.5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md w-full mx-auto justify-between h-full group`}>
      <div className="w-full flex-1 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className={`${styles.label} text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] line-clamp-1`}>
            {label}
          </span>
          {percentageValue && (
            <span className={`${styles.percent} text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md leading-none inline-block shadow-sm transition-colors`}>
              {percentageValue}
            </span>
          )}
        </div>
      </div>
      
      <span className={`${styles.value} text-sm md:text-base font-black tabular-nums leading-none mt-2.5`}>
        {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
      </span>
    </div>
  );
};

export default Card;
