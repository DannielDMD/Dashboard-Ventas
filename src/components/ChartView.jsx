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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const STATUS_COLORS = {
  Instalado: '#10b981',
  Pendiente: '#f59e0b',
};

const ChartView = ({ totals, title }) => {
  if (!totals) return null;

  // Data for Meta vs Ventas
  const comparisonData = [
    {
      name: 'Métricas de Venta',
      Meta: totals.meta,
      'Con Adicionales': totals.ventasAdicionales,
      'Sin Adicionales': totals.ventasSinAdicionales,
    },
  ];

  // Data for Execution (Instalado vs Pendiente)
  const executionData = [
    { name: 'Instalado', value: totals.instalado },
    { name: 'Pendiente', value: totals.pendiente },
  ];

  // Data for Opportunities
  const opportunityData = [
    { name: 'T1', value: totals.tipoOportunidad1 },
    { name: 'T2', value: totals.tipoOportunidad2 },
    { name: 'T3', value: totals.tipoOportunidad3 },
    { name: 'T4', value: totals.tipoOportunidad4 },
  ];

  // Data for Other Indicators
  const otherIndicators = [
    { name: 'Servicios', value: totals.servicios },
    { name: 'Descartado', value: totals.descartado },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
          {title} - Análisis Visual
        </h4>
        {totals.porcentajeInstalado && (
          <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Eficiencia Instalación</span>
            <span className="text-2xl font-black text-blue-700">{totals.porcentajeInstalado}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Comparison Bar Chart */}
        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Visualización de Venta vs Meta</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
                <Bar name="Meta" dataKey="Meta" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={45} />
                <Bar name="V. con Adic." dataKey="Con Adicionales" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={45} />
                <Bar name="V. sin Adic." dataKey="Sin Adicionales" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Execution Pie Chart */}
        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Estado de Ejecución Real</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={executionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {executionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opportunities Distribution */}
        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 lg:col-span-1">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Distribución de Oportunidades</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={opportunityData} layout="vertical" margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Bar name="Cantidad" dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24}>
                  {opportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Other Indicators */}
        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 lg:col-span-1">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Servicios y Descartados</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={otherIndicators}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Bar name="Valor" dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={40}>
                   <Cell fill="#6366f1" />
                   <Cell fill="#ef4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartView;
