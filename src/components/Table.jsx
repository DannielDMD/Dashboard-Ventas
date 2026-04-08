import React from 'react';
import { calcPercentage } from '../utils/calculations';

const Table = ({ rows, totals, title }) => {
  const formatNum = (val) => (val || 0).toLocaleString('es-CO');

  return (
    <div className="mb-6 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
      {title && <h4 className="text-lg font-black text-slate-800 mb-4 px-1">{title}</h4>}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left text-gray-600 border-collapse">
          <thead className="text-[10px] text-white uppercase bg-[#1E3A8A] sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 font-bold border-r border-blue-800/50 min-w-[80px]">Tipo</th>
              <th className="px-3 py-3 font-bold border-r border-blue-800/50 min-w-[120px]">Ubicación</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Meta</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">Servicios</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Ventas (Con Adicionales)</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Ventas (Sin Adicionales)</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Instalados (Con Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Instalados (Sin Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Pendientes (Con Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Pendientes (Sin Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Descartados (Con Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Descartados (Sin Adicionales)</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Oportunidad</th>
              <th className="px-3 py-3 font-bold text-center border-r border-blue-800/50">%</th>
              <th className="px-3 py-3 font-bold text-right border-r border-blue-800/50">Digital</th>
              <th className="px-3 py-3 font-bold text-center">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const pInstCon = calcPercentage(row.instaladoAdiciones, row.ventasAdicionales);
              const pInstSin = calcPercentage(row.instalado, row.ventasSinAdicionales);
              const pPendCon = calcPercentage(row.pendienteAdiciones, row.ventasAdicionales);
              const pPendSin = calcPercentage(row.pendiente, row.ventasSinAdicionales);
              const pDescCon = calcPercentage(row.descartadoAdiciones, row.ventasAdicionales);
              const pDescSin = calcPercentage(row.descartado, row.ventasSinAdicionales);
              const pOport = calcPercentage(row.oportunidad, row.ventasSinAdicionales);
              const pDigit = calcPercentage(row.digital, row.ventasSinAdicionales);

              return (
                <tr key={row.id || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} border-b border-gray-50 hover:bg-slate-100/50 transition-colors`}>
                  <td className="px-3 py-2 border-r border-gray-50">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${row.tipo === 'Agencias' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {row.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800 border-r border-gray-50">{row.ubicacion}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50">{formatNum(row.meta)}</td>
                  <td className="px-3 py-2 text-center border-r border-gray-50 font-bold">{row.servicios}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 font-medium">{formatNum(row.ventasAdicionales)}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 font-medium">{formatNum(row.ventasSinAdicionales)}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50">{formatNum(row.instaladoAdiciones)}</td>
                  <td className="px-3 py-2 text-center font-bold text-emerald-600 border-r border-gray-50">{pInstCon}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50">{formatNum(row.instalado)}</td>
                  <td className="px-3 py-2 text-center font-bold text-emerald-600 border-r border-gray-50">{pInstSin}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50">{formatNum(row.pendienteAdiciones)}</td>
                  <td className="px-3 py-2 text-center font-bold text-amber-600 border-r border-gray-50">{pPendCon}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50">{formatNum(row.pendiente)}</td>
                  <td className="px-3 py-2 text-center font-bold text-amber-600 border-r border-gray-50">{pPendSin}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 text-rose-500">{formatNum(row.descartadoAdiciones)}</td>
                  <td className="px-3 py-2 text-center font-bold text-rose-500 border-r border-gray-50">{pDescCon}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 text-rose-500">{formatNum(row.descartado)}</td>
                  <td className="px-3 py-2 text-center font-bold text-rose-500 border-r border-gray-50">{pDescSin}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 text-blue-600">{formatNum(row.oportunidad)}</td>
                  <td className="px-3 py-2 text-center font-bold text-blue-600 border-r border-gray-50">{pOport}</td>
                  <td className="px-3 py-2 text-right font-mono border-r border-gray-50 text-indigo-600">{formatNum(row.digital)}</td>
                  <td className="px-3 py-2 text-center font-bold text-indigo-600">{pDigit}</td>
                </tr>
              );
            })}
          </tbody>
          {totals && (
            <tfoot className="bg-slate-800 text-white font-mono text-[10px]">
              <tr className="divide-x divide-slate-700">
                <td className="px-3 py-3 font-black">TOTAL</td>
                <td className="px-3 py-3 text-center text-slate-500">-</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.meta)}</td>
                <td className="px-3 py-3 text-center font-bold">{totals.servicios}</td>
                <td className="px-3 py-3 text-right font-bold">{formatNum(totals.ventasAdicionales)}</td>
                <td className="px-3 py-3 text-right font-bold">{formatNum(totals.ventasSinAdicionales)}</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.instaladoAdiciones)}</td>
                <td className="px-3 py-3 text-center font-black text-emerald-400">{totals.porcInstaladoConAdic}</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.instalado)}</td>
                <td className="px-3 py-3 text-center font-black text-emerald-400">{totals.porcInstaladoSinAdic}</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.pendienteAdiciones)}</td>
                <td className="px-3 py-3 text-center font-black text-amber-400">{totals.porcPendienteConAdic}</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.pendiente)}</td>
                <td className="px-3 py-3 text-center font-black text-amber-400">{totals.porcPendienteSinAdic}</td>
                <td className="px-3 py-3 text-right text-rose-300">{formatNum(totals.descartadoAdiciones)}</td>
                <td className="px-3 py-3 text-center font-black text-rose-400">{totals.porcDescartadoConAdic}</td>
                <td className="px-3 py-3 text-right text-rose-300">{formatNum(totals.descartado)}</td>
                <td className="px-3 py-3 text-center font-black text-rose-400">{totals.porcDescartadoSinAdic}</td>
                <td className="px-3 py-3 text-right text-blue-300">{formatNum(totals.oportunidad)}</td>
                <td className="px-3 py-3 text-center font-black text-blue-400">{totals.porcOportunidad}</td>
                <td className="px-3 py-3 text-right text-indigo-300">{formatNum(totals.digital)}</td>
                <td className="px-3 py-3 text-center font-black text-indigo-400">{totals.porcDigital}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
