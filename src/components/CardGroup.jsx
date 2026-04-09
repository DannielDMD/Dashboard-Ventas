import React, { useState } from 'react';
import Card from './Card';
import CardGroupChart from './CardGroupChart';
import ViewSelector from './ViewSelector';
import CollapsibleSection from './CollapsibleSection';
import { calcPercentage } from '../utils/calculations';

const CardGroup = ({ totals, comparisonData, title = "Resumen de Métricas" }) => {
  const [viewMode, setViewMode] = useState('cards');

  if (!totals) return null;

  const selectorOptions = [
    { label: 'Tarjetas', value: 'cards' },
    { label: 'Gráficas', value: 'charts' }
  ];

  const renderMetricSection = (sectionTitle, data, isSinAdiciones = false) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-slate-400 rounded-full"></div>
        <h5 className="text-[12px] md:text-[13px] font-black text-slate-700 uppercase tracking-widest">
          {sectionTitle}
        </h5>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1.5 md:gap-2">
        <Card label="Cantidad" value={data.servicios} />
        <Card label="Venta" value={data.venta} type="ventas" />

        <Card
          label="Instalado"
          value={data.instalado}
          type="instalado"
          percentageValue={calcPercentage(data.instalado, totals.meta)}
        />

        <Card
          label="Pendiente"
          value={data.pendiente}
          type="pendiente"
          percentageValue={calcPercentage(data.pendiente, totals.meta)}
        />

        <Card
          label="Descartado"
          value={isSinAdiciones ? totals.descartado : totals.descartadoAdiciones}
          type="descartado"
          percentageValue={calcPercentage(isSinAdiciones ? totals.descartado : totals.descartadoAdiciones, totals.meta)}
        />

        <Card
          label="Oportunidad"
          value={totals.oportunidad}
          type="oportunidad"
          percentageValue={calcPercentage(totals.oportunidad, totals.meta)}
        />

        <Card
          label="Digital"
          value={totals.digital}
          type="digital"
          percentageValue={calcPercentage(totals.digital, totals.meta)}
        />
      </div>
    </div>
  );

  return (
    <CollapsibleSection 
      title={title} 
      subtitle="Monitoreo de Objetivos"
      iconColor="bg-blue-600"
    >
      <div className="space-y-4">
        {/* Header Interno para Selector y Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex-1">
            {viewMode === 'cards' && (
              <div className="w-32 md:w-36">
                <Card label="META" value={totals.meta} type="meta" />
              </div>
            )}
          </div>
          <div className="shrink-0">
            <ViewSelector
              options={selectorOptions}
              activeValue={viewMode}
              onChange={setViewMode}
              compact
            />
          </div>
        </div>

        {/* Contenido */}
        {viewMode === 'cards' ? (
          <div className="space-y-6 pt-1">
            {renderMetricSection("Con Adicionales", {
              servicios: totals.servicios,
              venta: totals.ventasAdicionales,
              instalado: totals.instaladoAdiciones,
              pendiente: totals.pendienteAdiciones
            }, false)}

            {renderMetricSection("Sin Adicionales", {
              servicios: totals.servicios,
              venta: totals.ventasSinAdicionales,
              instalado: totals.instalado,
              pendiente: totals.pendiente
            }, true)}
          </div>
        ) : (
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
            <CardGroupChart totals={totals} />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default CardGroup;
