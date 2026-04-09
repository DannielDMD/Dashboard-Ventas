import React from 'react';

const Card = ({ label, value, type = 'default', percentageValue }) => {
  const getStyles = () => {
    switch (type) {
      case 'ventas':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-primary shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-primary'
        };
      case 'instalado':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-success shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-success'
        };
      case 'pendiente':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-warning shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-warning'
        };
      case 'descartado':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-danger shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-danger'
        };
      case 'oportunidad':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-purple-500 shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-purple-600'
        };
      case 'digital':
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-info shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-info'
        };
      case 'meta':
        return {
          container: 'bg-slate-50 border-slate-300 border-t-[5px] border-t-brand-slate shadow-sm',
          label: 'text-slate-900 font-black',
          value: 'text-slate-900',
          percent: 'text-slate-500'
        };
      default:
        return {
          container: 'bg-white border-slate-200 border-t-[5px] border-t-slate-400 shadow-sm hover:shadow-md',
          label: 'text-slate-900',
          value: 'text-slate-900',
          percent: 'text-slate-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.container} rounded-xl border p-3 md:p-4 flex flex-col items-center text-center transition-all duration-300 w-full mx-auto justify-between h-full min-h-[90px] group`}>
      <div className="w-full flex-1 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center gap-2 mb-2">
          <span className={`${styles.label} text-label-caps line-clamp-1 antialiased`}>
            {label}
          </span>
          {percentageValue && (
            <span className={`${styles.percent} text-percentage font-black px-1 leading-none inline-block transition-colors`}>
              {percentageValue}
            </span>
          )}
        </div>
      </div>

      <span className={`${styles.value} text-metric-sm leading-none mt-auto py-1`}>
        {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
      </span>
    </div>
  );
};

export default Card;
