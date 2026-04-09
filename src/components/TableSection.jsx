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
    <div className="space-y-4">
      {/* Contenido Dinámico */}
      {ubicaciones.map((u, i) => {
        const locTotals = calculateTotals(u.filas);

        // Datos comparativos: Agencias vs Directos
        const agenciasRows = u.filas.filter(r => r.tipo === 'Agencias');
        const directosRows = u.filas.filter(r => r.tipo === 'Directos');
        const compData = [
          { ...calculateTotals(agenciasRows), name: 'Agencias' },
          { ...calculateTotals(directosRows), name: 'Directos' }
        ];

        // Título: Si es la primera tabla de una sección, combinamos el nombre de la sección con el de la ubicación
        const displayTitle = i === 0 ? `${nombre}: ${u.nombre}` : u.nombre;
        
        // El selector solo se muestra en la primera tabla/gráfica de la sección
        const selector = i === 0 ? (
          <ViewSelector
            options={selectorOptions}
            activeValue={viewMode}
            onChange={setViewMode}
            compact
          />
        ) : null;

        return viewMode === 'table' ? (
          <Table
            key={i}
            rows={u.filas}
            totals={locTotals}
            title={displayTitle}
            rightContent={selector}
          />
        ) : (
          <ChartView
            key={i}
            comparisonData={compData}
            title={displayTitle}
            rightContent={selector}
          />
        );
      })}

      {/* Resumen de la sección completa */}
      {showSummary && (
        <div className="pt-2 border-t border-gray-200/50">
          <CardGroup totals={sectionTotals} comparisonData={sectionComparisonData} title={`${nombre} Total`} />
        </div>
      )}
    </div>
  );
};

export default TableSection;
