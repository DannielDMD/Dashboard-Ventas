import React, { useMemo, useState } from 'react';
import Table from './Table';
import CardGroup from './CardGroup';
import ChartView from './ChartView';
import { calculateTotals } from '../utils/calculations';

const TableSection = ({ sectionData, showSummary = true }) => {
  const { nombre, ubicaciones } = sectionData;
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'chart'
  
  // Totales de la sección completa (ej. la suma de todas las tablas en Regionales)
  const allRowsInSection = useMemo(() => {
    return ubicaciones.flatMap(u => u.filas);
  }, [ubicaciones]);

  const sectionTotals = useMemo(() => calculateTotals(allRowsInSection), [allRowsInSection]);

  return (
    <div className="mb-14 p-6 md:p-10 bg-white/40 rounded-3xl border border-gray-200/50 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-8 bg-blue-600 rounded-full"></div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">{nombre}</h3>
        </div>

        {/* Selector de Vista */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 w-fit">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              viewMode === 'table'
                ? 'bg-white text-blue-600 shadow-md shadow-blue-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Tabla
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              viewMode === 'chart'
                ? 'bg-white text-blue-600 shadow-md shadow-blue-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Gráficas
          </button>
        </div>
      </div>
      
      {/* Contenido Dinámico */}
      <div className="space-y-6">
        {ubicaciones.map((u, i) => {
            const locTotals = calculateTotals(u.filas);
            return viewMode === 'table' ? (
                <Table 
                    key={i} 
                    rows={u.filas} 
                    totals={locTotals} 
                    title={u.nombre} 
                />
            ) : (
                <ChartView 
                    key={i} 
                    totals={locTotals} 
                    title={u.nombre} 
                />
            );
        })}
      </div>
      
      {/* Resumen de la sección completa (Solo si showSummary es true) */}
      {showSummary && (
        <div className="mt-12 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em]">Resumen de Sección</h4>
                <span className="text-xs font-medium text-gray-400">{nombre} Total</span>
            </div>
            <CardGroup totals={sectionTotals} title={`${nombre} Total`} />
        </div>
      )}
    </div>
  );
};

export default TableSection;
