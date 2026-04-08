//import React from 'react';
//import Card from './Card';

import React, { useState } from 'react';
import Card from './Card';
import ChartView from './ChartView';

const CardGroup = ({ totals, comparisonData, title = "Resumen de Métricas" }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'charts'

  if (!totals) return null;

  const cardData = [
    { label: "Meta", value: totals.meta },
    { label: "Servicios", value: totals.servicios },
    { label: "Venta con Adicionales", value: totals.ventasAdicionales },
    { label: "Instalado con Adicionales", value: totals.instaladoAdiciones },
    { label: "Pendiente con Adicionales", value: totals.pendienteAdiciones },
    { label: "% Instalación", value: totals.porcentajeInstalado },
    { label: "Instalado sin Adicionales", value: totals.instalado },
    { label: "Pendiente sin Adicionales", value: totals.pendiente },
    { label: "Ventas sin Adicionales", value: totals.ventasSinAdicionales },
    { label: "Descartado", value: totals.descartado }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-300/30 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${viewMode === 'cards'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Tarjetas
          </button>
          <button
            onClick={() => setViewMode('charts')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${viewMode === 'charts'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Gráficas
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cardData.map((item, index) => (
            <Card key={index} label={item.label} value={item.value} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50/50 rounded-3xl p-1 border border-slate-100">
          <ChartView totals={totals} comparisonData={comparisonData} title={title} />
        </div>
      )}
    </div>
  );
};

export default CardGroup;
