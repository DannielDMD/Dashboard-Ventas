import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = {
  meta: '#334155', // slate-700
  conAdic: '#3b82f6', // blue-500
  sinAdic: '#10b981', // emerald-500
  pendiente: '#f59e0b', // amber-500
  descartado: '#ef4444', // red-500
  servicios: '#8b5cf6', // purple-500
};

const ChartView = ({ comparisonData, title, rightContent }) => {
  const [filterMode, setFilterMode] = useState('ambos'); // 'con', 'sin', 'ambos'

  if (!comparisonData || comparisonData.length === 0) return null;

  // A. VENTAS: Comparativa de Agencias vs Directos (o Grupos/Ubicaciones)
  const dataVentas = comparisonData.map(d => ({
    name: d.name,
    Meta: d.meta,
    ...(filterMode === 'ambos' || filterMode === 'con' ? { 'Ventas Con': d.ventasAdicionales } : {}),
    ...(filterMode === 'ambos' || filterMode === 'sin' ? { 'Ventas Sin': d.ventasSinAdicionales } : {}),
  }));

  // B. INSTALACIÓN VS PENDIENTE
  const dataInstalacion = comparisonData.map(d => ({
    name: d.name,
    ...(filterMode === 'ambos' || filterMode === 'con' ? {
      'Instalado Con': d.instaladoAdiciones,
      'Pendiente Con': d.pendienteAdiciones
    } : {}),
    ...(filterMode === 'ambos' || filterMode === 'sin' ? {
      'Instalado Sin': d.instalado,
      'Pendiente Sin': d.pendiente
    } : {}),
  }));

  // C. SERVICIOS 
  const dataServicios = comparisonData.map(d => ({
    name: d.name,
    Servicios: d.servicios
  }));

  const formatTick = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
      if (val >= 1000) return (val / 1000).toFixed(0) + 'k';
    }
    return val;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-xs">
          <p className="font-bold text-slate-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.payload.fill }}></div>
              <span className="text-slate-600 font-medium">{entry.name}:</span>
              <span className="font-black tabular-nums text-slate-900">{entry.value.toLocaleString('es-CO')}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 transition-all duration-300">
      {/* Header Compacto */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-5 px-1 border-b border-slate-50 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-slate-400 rounded-full"></div>
          <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight uppercase">
            {title}
          </h4>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Contenedor de Selectores Unidos */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-inner">
            {/* 1. Selector de Contexto (Interior) */}
            <div className="inline-flex bg-white/50 p-0.5 rounded-lg">
              {[
                { id: 'ambos', label: 'Ver Ambos' },
                { id: 'con', label: 'Con' },
                { id: 'sin', label: 'Sin' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setFilterMode(mode.id)}
                  className={`px-4 py-1.5 text-nav-pill rounded-md transition-all ${filterMode === mode.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-400 hover:text-slate-600 focus:outline-none'
                    }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Separador sutil */}
            {rightContent && <div className="h-4 w-px bg-slate-200 mx-1"></div>}

            {/* 2. Selector de Vista (Externo) */}
            {rightContent && (
              <div className="flex items-center">
                {rightContent}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Gráfica A: Ventas */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] font-black text-slate-900 mb-4 uppercase tracking-tight">Comparativa de Ventas</h4>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataVentas} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: '#64748b', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} verticalAlign="top" />
                <Bar name="Meta" dataKey="Meta" fill={COLORS.meta} radius={[4, 4, 0, 0]} />
                {filterMode !== 'sin' && <Bar name="V. Con Adic" dataKey="Ventas Con" fill={COLORS.conAdic} radius={[4, 4, 0, 0]} />}
                {filterMode !== 'con' && <Bar name="V. Sin Adic" dataKey="Ventas Sin" fill={COLORS.sinAdic} radius={[4, 4, 0, 0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica B: Instalación vs Pendiente */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] font-black text-slate-900 mb-4 uppercase tracking-tight">Eficiencia de Instalación</h4>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataInstalacion} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: '#64748b', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} verticalAlign="top" />
                {filterMode !== 'sin' && <Bar name="Inst (Con)" dataKey="Instalado Con" fill={COLORS.conAdic} radius={[4, 4, 0, 0]} stackId="con" />}
                {filterMode !== 'sin' && <Bar name="Pend (Con)" dataKey="Pendiente Con" fill="#eab308" radius={[4, 4, 0, 0]} stackId="con" />}
                {filterMode !== 'con' && <Bar name="Inst (Sin)" dataKey="Instalado Sin" fill={COLORS.sinAdic} radius={[4, 4, 0, 0]} stackId="sin" />}
                {filterMode !== 'con' && <Bar name="Pend (Sin)" dataKey="Pendiente Sin" fill={COLORS.pendiente} radius={[4, 4, 0, 0]} stackId="sin" />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica C: Servicios */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] font-black text-slate-900 mb-4 uppercase tracking-tight">Volumen de Servicios</h4>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataServicios} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: '#64748b', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} verticalAlign="top" />
                <Bar name="Servicios" dataKey="Servicios" fill={COLORS.servicios} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartView;
