import React from 'react';
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
  Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];
const COMPARISON_COLORS = {
  'Agencias': '#8b5cf6',
  'Directos': '#3b82f6',
  'Grupo 1': '#6366f1',
  'Grupo 2': '#10b981',
  'Meta': '#3b82f6',
  'Ventas': '#8b5cf6',
  'Instalado': '#10b981',
  'Pendiente': '#f59e0b',
};

const ChartView = ({ totals, comparisonData, title, rightContent }) => {
  const isComparative = comparisonData && comparisonData.length > 0;
  const currentTotals = totals || (isComparative ? comparisonData.reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
        if (typeof curr[key] === 'number') acc[key] = (acc[key] || 0) + curr[key];
    });
    return acc;
  }, {}) : null);

  if (!currentTotals && !isComparative) return null;

  let barData = [];
  if (isComparative) {
    barData = comparisonData.map(d => ({
        name: d.name,
        Meta: d.meta,
        'V. con Adic.': d.ventasAdicionales,
        'V. sin Adic.': d.ventasSinAdicionales,
        Ventas: d.ventasAdicionales + d.ventasSinAdicionales,
        Instalado: d.instalado,
        Pendiente: d.pendiente
    }));
  } else {
    barData = [{
        name: 'Gral',
        Meta: currentTotals.meta,
        Instalado: currentTotals.instalado,
        Pendiente: currentTotals.pendiente,
        Ventas: currentTotals.ventasAdicionales + currentTotals.ventasSinAdicionales
    }];
  }

  const pieData = [
    { name: 'Instalado', value: currentTotals.instalado },
    { name: 'Pendiente', value: currentTotals.pendiente },
  ];

  const opportunityData = [
    { name: 'Oport', value: currentTotals.oportunidad },
    { name: 'Digital', value: currentTotals.digital },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 transition-all duration-300">
      {/* Header Compacto */}
      <div className="flex items-center justify-between mb-5 px-1 border-b border-slate-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-slate-400 rounded-full"></div>
          <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight uppercase">
            {title}
          </h4>
        </div>
        {rightContent && <div>{rightContent}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Sales & Meta Analysis */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Meta vs Ventas</p>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }}
                />
                <Legend verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                <Bar name="Meta" dataKey="Meta" fill={COMPARISON_COLORS.Meta} radius={[3, 3, 0, 0]} barSize={isComparative ? 20 : 35} />
                <Bar name="Ventas" dataKey="Ventas" fill={COMPARISON_COLORS.Ventas} radius={[3, 3, 0, 0]} barSize={isComparative ? 20 : 35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Execution Comparison */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Instalado vs Pendiente</p>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {isComparative ? (
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }}
                  />
                  <Legend verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                  <Bar name="Inst" dataKey="Instalado" fill={COMPARISON_COLORS.Instalado} radius={[3, 3, 0, 0]} barSize={15} />
                  <Bar name="Pend" dataKey="Pendiente" fill={COMPARISON_COLORS.Pendiente} radius={[3, 3, 0, 0]} barSize={15} />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COMPARISON_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }} />
                  <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opportunity Breakdown */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Oportunidad vs Digital</p>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={opportunityData} layout="vertical" margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 800, fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={15}>
                  {opportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services / Descartado Summary */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Otros Indicadores</p>
          <div className="grid grid-cols-2 gap-2 h-full pt-2">
             <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Servicios</span>
                <span className="text-xl font-black text-indigo-600 leading-none">{currentTotals.servicios}</span>
             </div>
             <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Descartado</span>
                <span className="text-xl font-black text-rose-500 leading-none">{currentTotals.descartado}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartView;
