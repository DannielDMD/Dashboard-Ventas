import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = {
  meta: '#334155', // slate-700
  conAdic: '#3b82f6', // blue-500
  sinAdic: '#10b981', // emerald-500
  pendiente: '#f59e0b', // amber-500
  descartado: '#ef4444', // red-500
  oportunidad: '#8b5cf6', // purple-500
  digital: '#06b6d4', // cyan-500
  servicios: '#6366f1' // indigo-500
};

const CardGroupChart = ({ totals, rightContent }) => {
  // Maneja el selector local dentro de las gráficas
  const [filterMode, setFilterMode] = useState('ambos'); // 'con', 'sin', 'ambos'

  if (!totals) return null;

  // ========== A. META VS VENTAS ==========
  const dataMetaVentas = [
    {
      name: 'Resultados',
      Meta: totals.meta,
      ...(filterMode === 'ambos' || filterMode === 'con' ? { 'Ventas Con': totals.ventasAdicionales } : {}),
      ...(filterMode === 'ambos' || filterMode === 'sin' ? { 'Ventas Sin': totals.ventasSinAdicionales } : {}),
    }
  ];

  // ========== B. INSTALADO VS PENDIENTE ==========
  const dataInstalacion = [];
  if (filterMode === 'ambos' || filterMode === 'con') {
    dataInstalacion.push({
      name: 'Con Adicionales',
      Instalado: totals.instaladoAdiciones,
      Pendiente: totals.pendienteAdiciones
    });
  }
  if (filterMode === 'ambos' || filterMode === 'sin') {
    dataInstalacion.push({
      name: 'Sin Adicionales',
      Instalado: totals.instalado,
      Pendiente: totals.pendiente
    });
  }

  // ========== C. OPORTUNIDAD VS DIGITAL ==========
  const dataOportDigital = [
    { name: 'Oportunidad', value: totals.oportunidad, fill: COLORS.oportunidad },
    { name: 'Digital', value: totals.digital, fill: COLORS.digital }
  ];

  // ========== D. SERVICIOS VS DESCARTADO ==========
  const dataServDesc = [
    {
      name: 'Volumen',
      Servicios: totals.servicios,
      ...(filterMode === 'ambos' || filterMode === 'con' ? { 'Desc. Con': totals.descartadoAdiciones } : {}),
      ...(filterMode === 'ambos' || filterMode === 'sin' ? { 'Desc. Sin': totals.descartado } : {}),
    }
  ];

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
    <div className="space-y-4">
      {/* Header Compacto de Controles */}
      <div className="flex justify-center md:justify-end mb-4">
        <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {/* 1. Escenarios */}
          <div className="inline-flex bg-white/50 p-0.5 rounded-lg border border-slate-200/50">
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
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Separador */}
          {rightContent && <div className="h-4 w-px bg-slate-300 mx-1"></div>}

          {/* 2. Selector de Vista (Tabla/Gráfica) */}
          {rightContent && (
            <div className="flex items-center">
              {rightContent}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Gráfica A: Meta vs Ventas */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] text-graph-sub mb-4">Meta vs Ventas</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMetaVentas} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Bar dataKey="Meta" fill={COLORS.meta} radius={[4, 4, 0, 0]} />
                {filterMode !== 'sin' && <Bar dataKey="Ventas Con" fill={COLORS.conAdic} radius={[4, 4, 0, 0]} />}
                {filterMode !== 'con' && <Bar dataKey="Ventas Sin" fill={COLORS.sinAdic} radius={[4, 4, 0, 0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica B: Instalado vs Pendiente */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] text-graph-sub mb-4">Eficiencia de Instalación</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataInstalacion} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fontWeight: 'bold', fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Bar dataKey="Instalado" fill={COLORS.sinAdic} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pendiente" fill={COLORS.pendiente} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica C: Oportunidad vs Digital */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
          <h4 className="text-[16px] text-graph-sub mb-4">Oportunidad vs Digital</h4>
          <div className="h-[200px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataOportDigital}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {dataOportDigital.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica D: Servicios vs Descartado */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="text-[16px] text-graph-sub mb-4">Servicios & Descartados</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataServDesc} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatTick} tick={{ fontSize: 16, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Bar dataKey="Servicios" fill={COLORS.servicios} radius={[4, 4, 0, 0]} />
                {filterMode !== 'sin' && <Bar dataKey="Desc. Con" fill={COLORS.descartado} radius={[4, 4, 0, 0]} />}
                {filterMode !== 'con' && <Bar dataKey="Desc. Sin" fill={COLORS.descartado} radius={[4, 4, 0, 0]} opacity={0.6} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardGroupChart;
