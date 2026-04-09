import React from 'react';

const Card = ({ label, value, type = 'default', percentageValue }) => {
  const getStyles = () => {
    switch (type) {
      case 'ventas':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-blue-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-blue-600'
        };
      case 'instalado':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-emerald-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-emerald-600'
        };
      case 'pendiente':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-amber-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-amber-600'
        };
      case 'descartado':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-rose-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-rose-600'
        };
      case 'oportunidad':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-purple-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-purple-600'
        };
      case 'digital':
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-cyan-500',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-cyan-600'
        };
      case 'meta':
        return {
          container: 'bg-slate-50 border-slate-300 border-t-4 border-t-slate-800',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-slate-500'
        };
      default:
        return {
          container: 'bg-white border-slate-200 border-t-4 border-t-slate-400',
          label: 'text-slate-1000',
          value: 'text-black',
          percent: 'text-slate-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.container} rounded-xl border p-2.5 md:p-3 flex flex-col items-center text-center transition-all duration-300 hover:border-slate-400 w-full mx-auto justify-between h-full group`}>
      <div className="w-full flex-1 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className={`${styles.label} text-[9px] md:text-[10px] font-black uppercase tracking-widest line-clamp-1 antialiased`}>
            {label}
          </span>
          {percentageValue && (
            <span className={`${styles.percent} text-[10px] md:text-xs font-black px-1 leading-none inline-block transition-colors`}>
              {percentageValue}
            </span>
          )}
        </div>
      </div>

      <span className={`${styles.value} text-sm md:text-base font-black tabular-nums leading-none mt-2`}>
        {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
      </span>
    </div>
  );
};

export default Card;
