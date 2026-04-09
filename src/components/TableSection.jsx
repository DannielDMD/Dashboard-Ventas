import React, { useMemo, useState } from 'react';
import Table from './Table';
import CardGroup from './CardGroup';
import ChartView from './ChartView';
import ViewSelector from './ViewSelector';
import CollapsibleSection from './CollapsibleSection';
import { calculateTotals } from '../utils/calculations';

const TableSection = ({ sectionData, showSummary = true }) => {
  const { nombre, ubicaciones } = sectionData;
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'chart'

  // Totales de la sección completa
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
    { label: 'Tabla', value: 'table' },
    { label: 'Gráficas', value: 'chart' }
  ];

  return (
    <CollapsibleSection title={nombre} subtitle="Análisis de Sedes">
      <div className="space-y-4">
        <div className="flex justify-end">
          <ViewSelector
            options={selectorOptions}
            activeValue={viewMode}
            onChange={setViewMode}
            compact
          />
        </div>

        {ubicaciones.map((u, i) => {
          const locTotals = calculateTotals(u.filas);
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

        {/* Gráfica Comparativa Regional */}
        {viewMode === 'chart' && ubicaciones.length > 1 && (
          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <ChartView
              comparisonData={sectionComparisonData}
              title={`Comparativa de Ubicaciones en ${nombre}`}
            />
          </div>
        )}

        {/* Resumen de la sección completa */}
        {showSummary && (
          <div className="pt-2 border-t border-slate-200/50">
            <CardGroup totals={sectionTotals} comparisonData={sectionComparisonData} title={`${nombre} Total`} />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default TableSection;
