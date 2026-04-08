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

const ChartView = ({ totals, comparisonData, title }) => {
  // if comparisonData is present, we use it for comparative charts.
  // otherwise we use totals for summary charts.
  
  const isComparative = comparisonData && comparisonData.length > 0;
  const currentTotals = totals || (isComparative ? comparisonData.reduce((acc, curr) => {
    // combine all into a summary for the donut and misc charts
    Object.keys(curr).forEach(key => {
        if (typeof curr[key] === 'number') acc[key] = (acc[key] || 0) + curr[key];
    });
    return acc;
  }, {}) : null);

  if (!currentTotals && !isComparative) return null;

  // Chart 1: Sales / Meta Comparison
  let barData = [];
  if (isComparative) {
    // Comparison by group/type/location
    // Metrics: Meta, Ventas (Sin Adic), Ventas (Con Adic)
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
        name: 'General',
        Meta: currentTotals.meta,
        'V. con Adic.': currentTotals.ventasAdicionales,
        'V. sin Adic.': currentTotals.ventasSinAdicionales,
        Instalado: currentTotals.instalado,
        Pendiente: currentTotals.pendiente
    }];
  }

  // Chart 2: Execution Efficiency (Pie)
  const pieData = [
    { name: 'Instalado', value: currentTotals.instalado },
    { name: 'Pendiente', value: currentTotals.pendiente },
  ];

  // Chart 3: Opportunities (Aggregated)
  const opportunityData = [
    { name: 'T1', value: currentTotals.tipoOportunidad1 },
    { name: 'T2', value: currentTotals.tipoOportunidad2 },
    { name: 'T3', value: currentTotals.tipoOportunidad3 },
    { name: 'T4', value: currentTotals.tipoOportunidad4 },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h4 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
            {title}
          </h4>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 ml-5">
            {isComparative ? 'Análisis Comparativo' : 'Resumen Estadístico'}
          </p>
        </div>
        {currentTotals.porcentajeInstalado && (
          <div className="bg-emerald-50 px-6 py-2.5 rounded-2xl border border-emerald-100/50 flex flex-col items-center">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Eficiencia Global</span>
            <span className="text-2xl font-black text-emerald-700 leading-none">{currentTotals.porcentajeInstalado}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sales & Meta Analysis */}
        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Meta vs Ventas Realizadas</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 30px -10px rgba(0,0,0,0.15)' }}
                />
                <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
                <Bar name="Meta" dataKey="Meta" fill={COMPARISON_COLORS.Meta} radius={[6, 6, 0, 0]} barSize={isComparative ? 30 : 50} />
                <Bar name="Ventas Total" dataKey="Ventas" fill={COMPARISON_COLORS.Ventas} radius={[6, 6, 0, 0]} barSize={isComparative ? 30 : 50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Execution Comparison */}
        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Instalado vs Pendiente</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {isComparative ? (
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 30px -10px rgba(0,0,0,0.15)' }}
                  />
                  <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
                  <Bar name="Instalado" dataKey="Instalado" fill={COMPARISON_COLORS.Instalado} radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar name="Pendiente" dataKey="Pendiente" fill={COMPARISON_COLORS.Pendiente} radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COMPARISON_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 30px -10px rgba(0,0,0,0.15)' }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opportunity Breakdown */}
        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Oportunidades T1-T4</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={opportunityData} layout="vertical" margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 800 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 30px -10px rgba(0,0,0,0.15)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={25}>
                  {opportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services / Descartado Summary */}
        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Otros Indicadores</p>
          <div className="grid grid-cols-2 gap-4 h-full pt-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Servicios</span>
                <span className="text-4xl font-black text-indigo-600">{currentTotals.servicios}</span>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Descartado</span>
                <span className="text-4xl font-black text-rose-500">{currentTotals.descartado}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartView;
