import React, { useState } from 'react';
import Card from './Card';
import ChartView from './ChartView';
import ViewSelector from './ViewSelector';
import { calcPercentage } from '../utils/calculations';

const CardGroup = ({ totals, comparisonData, title = "Resumen de Métricas" }) => {
  const [viewMode, setViewMode] = useState('cards');

  if (!totals) return null;

  const selectorOptions = [
    { label: 'Tarjetas', value: 'cards' },
    { label: 'Gráficas', value: 'charts' }
  ];

  const renderMetricSection = (sectionTitle, data, isSinAdiciones = false) => (
    <div className="space-y-2">
      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 border-l-2 border-blue-500 ml-1">
        {sectionTitle}
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
    <div className="bg-white rounded-[1.5rem] p-4 lg:p-5 lg:px-6 border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] space-y-4 lg:space-y-3">
      {/* Header Interno Compacto */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">{title}</h3>
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">Control de Rendimiento</p>
        </div>

        <ViewSelector 
          options={selectorOptions} 
          activeValue={viewMode} 
          onChange={setViewMode} 
        />
      </div>

      {viewMode === 'cards' ? (
        <div className="space-y-5 lg:space-y-4">
          {/* Tarjeta de Meta Única Compacta */}
          <div className="flex justify-start">
            <div className="w-32">
              <Card label="Meta General" value={totals.meta} type="meta" />
            </div>
          </div>

          {/* Sección Con Adicionales */}
          {renderMetricSection("Con Adicionales", {
            servicios: totals.servicios,
            venta: totals.ventasAdicionales,
            instalado: totals.instaladoAdiciones,
            pendiente: totals.pendienteAdiciones
          }, false)}

          {/* Sección Sin Adicionales */}
          {renderMetricSection("Sin Adicionales", {
            servicios: totals.servicios,
            venta: totals.ventasSinAdicionales,
            instalado: totals.instalado,
            pendiente: totals.pendiente
          }, true)}
        </div>
      ) : (
        <div className="bg-slate-50/50 rounded-xl p-1 border border-slate-100">
          <ChartView totals={totals} comparisonData={comparisonData} title={title} />
        </div>
      )}
    </div>
  );
};

export default CardGroup;
