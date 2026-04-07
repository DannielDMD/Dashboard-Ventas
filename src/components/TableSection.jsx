import React, { useMemo } from 'react';
import Table from './Table';
import CardGroup from './CardGroup';
import { calculateTotals } from '../utils/calculations';

const TableSection = ({ sectionData, showSummary = true }) => {
  const { nombre, ubicaciones } = sectionData;
  
  // Totales de la sección completa (ej. la suma de todas las tablas en Regionales)
  const allRowsInSection = useMemo(() => {
    return ubicaciones.flatMap(u => u.filas);
  }, [ubicaciones]);

  const sectionTotals = useMemo(() => calculateTotals(allRowsInSection), [allRowsInSection]);

  return (
    <div className="mb-14 p-6 md:p-10 bg-white/40 rounded-3xl border border-gray-200/50 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-2.5 h-8 bg-blue-600 rounded-full"></div>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">{nombre}</h3>
      </div>
      
      {/* Tablas independientes por ubicación */}
      <div className="space-y-6">
        {ubicaciones.map((u, i) => {
            const locTotals = calculateTotals(u.filas);
            return (
                <Table 
                    key={i} 
                    rows={u.filas} 
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
            <CardGroup totals={sectionTotals} />
        </div>
      )}
    </div>
  );
};

export default TableSection;
