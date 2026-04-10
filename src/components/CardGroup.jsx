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
      <div className="flex items-center gap-3 px-1">
        <div className="w-1.5 h-6 bg-slate-300 rounded-full"></div>
        <h5 className="text-h-sub">
          {sectionTitle}
        </h5>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
          value={data.descartado}
          type="descartado"
          percentageValue={calcPercentage(data.descartado, totals.meta)}
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

  const selector = (
    <ViewSelector
      options={selectorOptions}
      activeValue={viewMode}
      onChange={setViewMode}
      compact
    />
  );

  return (
    <CollapsibleSection
      title={title}
      subtitle="Monitoreo de Objetivos y Cumplimiento"
      iconColor="bg-blue-600"
    >
      <div className="space-y-6">
        {/* Header Interno para Selector y Meta */}
        {viewMode === 'cards' && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 px-1">
            <div className="flex-1">
              <div className="w-40 md:w-48">
                <Card label="METAS" value={totals.meta} type="meta" />
              </div>
            </div>
            <div className="shrink-0">
              {selector}
            </div>
          </div>
        )}

        {/* Contenido */}
        {viewMode === 'cards' ? (
          <div className="space-y-8 pt-2">
            {renderMetricSection("ESCENARIO: CON ADICIONALES", {
              servicios: totals.servicios,
              venta: totals.ventasAdicionales,
              instalado: totals.instaladoAdiciones,
              pendiente: totals.pendienteAdiciones,
              descartado: totals.descartadoAdiciones
            }, false)}

            {renderMetricSection("ESCENARIO: SIN ADICIONALES", {
              servicios: totals.servicios,
              venta: totals.ventasSinAdicionales,
              instalado: totals.instalado,
              pendiente: totals.pendiente,
              descartado: totals.descartado
            }, true)}
          </div>
        ) : (
          <div className="card-inner">
            <CardGroupChart totals={totals} rightContent={selector} />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default CardGroup;
