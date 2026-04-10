import React from 'react';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-rose-100 shadow-sm">
      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
        Error de Conexión
      </h3>
      
      <p className="text-slate-500 max-w-md mb-8 font-medium">
        {message || 'No pudimos conectar con los servicios de 4D Software en este momento.'}
      </p>
      
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reintentar Conexión
      </button>
    </div>
  );
};

export default ErrorDisplay;
