import React from 'react';

const Card = ({ label, value, type = 'default', percentageValue }) => {
  const getStyles = () => {
    switch (type) {
      case 'ventas':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-blue-700',
          percent: 'text-blue-600'
        };
      case 'instalado':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-emerald-700',
          percent: 'text-emerald-600'
        };
      case 'pendiente':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-amber-700',
          percent: 'text-amber-600'
        };
      case 'descartado':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-rose-700',
          percent: 'text-rose-600'
        };
      case 'oportunidad':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-purple-700',
          percent: 'text-purple-600'
        };
      case 'digital':
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-cyan-700',
          percent: 'text-cyan-600'
        };
      case 'meta':
        return {
          container: 'bg-indigo-50 border-indigo-200 shadow-sm shadow-indigo-100',
          label: 'text-indigo-900',
          value: 'text-indigo-700',
          percent: 'text-indigo-600/70'
        };
      default:
        return {
          container: 'bg-white border-slate-200',
          label: 'text-black',
          value: 'text-slate-900',
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
