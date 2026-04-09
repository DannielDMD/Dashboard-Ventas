import React, { useMemo, useState } from 'react';
import Table from './Table';
import CardGroup from './CardGroup';
import ChartView from './ChartView';
import ViewSelector from './ViewSelector';
import { calculateTotals } from '../utils/calculations';

const TableSection = ({ sectionData, showSummary = true }) => {
  const { nombre, ubicaciones } = sectionData;
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'chart'

  // Totales de la sección completa (ej. la suma de todas las tablas en Regionales)
  const allRowsInSection = useMemo(() => {
    return ubicaciones.flatMap(u => u.filas);
  }, [ubicaciones]);

  const sectionTotals = useMemo(() => calculateTotals(allRowsInSection), [allRowsInSection]);

  const sectionComparisonData = useMemo(() => {
    return ubicaciones.map(u => ({
      ...calculateTotals(u.filas),
      name: u.nombre
    }));
  }, [ubicaciones]);

  const selectorOptions = [
    {
      label: 'Tabla',
      value: 'table',
      //icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> 
    },
    {
      label: 'Gráficas',
      value: 'chart',
      //icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> 
    }
  ];

  return (
    <div className="mb-6 p-4 sm:p-5 lg:p-6 xl:p-8 bg-white/40 rounded-3xl border border-gray-200/50 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-8 bg-blue-600 rounded-full"></div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">{nombre}</h3>
        </div>

        <ViewSelector
          options={selectorOptions}
          activeValue={viewMode}
          onChange={setViewMode}
        />
      </div>

      {/* Contenido Dinámico */}
      <div className="space-y-4 lg:space-y-5">
        {ubicaciones.map((u, i) => {
          const locTotals = calculateTotals(u.filas);

          // Datos comparativos: Agencias vs Directos
          const agenciasRows = u.filas.filter(r => r.tipo === 'Agencias');
          const directosRows = u.filas.filter(r => r.tipo === 'Directos');
          const compData = [
            { ...calculateTotals(agenciasRows), name: 'Agencias' },
            { ...calculateTotals(directosRows), name: 'Directos' }
          ];

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
              comparisonData={compData}
              title={u.nombre}
            />
          );
        })}
      </div>

      {/* Resumen de la sección completa (Solo si showSummary es true) */}
      {showSummary && (
        <div className="mt-8 pt-6 lg:mt-6 lg:pt-5 border-t border-gray-200/50">
          <CardGroup totals={sectionTotals} comparisonData={sectionComparisonData} title={`${nombre} Total`} />
        </div>
      )}
    </div>
  );
};

export default TableSection;
