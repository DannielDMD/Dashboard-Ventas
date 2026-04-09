import React from 'react';
import { calcPercentage } from '../utils/calculations';

const Table = ({ rows, totals, title }) => {
  const formatNum = (val) => (val || 0).toLocaleString('es-CO');

  return (
    <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 overflow-hidden">
      {title && (
        <div className="flex items-center gap-3 mb-5 px-1">
          <div className="w-1.5 h-5 bg-slate-300 rounded-full"></div>
          <h4 className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight">{title}</h4>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-xs text-left text-slate-600 border-collapse">
          <thead className="text-[10px] text-white uppercase bg-slate-900 sticky top-0 z-10">
            <tr>
              <th rowSpan="2" className="px-3 py-2 border-b border-r border-slate-700 min-w-[80px]">Tipo</th>
              <th rowSpan="2" className="px-3 py-2 border-b border-r border-slate-700 min-w-[120px]">Ubicación</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-r border-slate-700 tracking-wider">Meta</th>
              <th rowSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Servs.</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Ventas</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Instalados</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Pendientes</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Descartados</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-r border-slate-700">Oportunidad</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-slate-700">Digital</th>
            </tr>
            <tr className="bg-slate-800 text-[9px]">
              {/* Ventas */}
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium">Con Adic.</th>
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium">Sin Adic.</th>
              {/* Instalados */}
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Con Adic.</th>
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Sin Adic.</th>
              {/* Pendientes */}
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Con Adic.</th>
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Sin Adic.</th>
              {/* Descartados */}
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Con Adic.</th>
              <th className="px-2 py-1.5 text-right border-b border-r border-slate-700 font-medium whitespace-nowrap">Sin Adic.</th>
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
                <tr key={row.id || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100 hover:bg-slate-100/50 transition-colors`}>
                  <td className="px-3 py-2.5 border-r border-slate-100">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wide border ${row.tipo === 'Agencias' ? 'bg-slate-50 text-purple-700 border-purple-100' : 'bg-slate-50 text-emerald-700 border-emerald-100'}`}>
                      {row.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-bold text-slate-800 border-r border-slate-100">{row.ubicacion}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-medium border-r border-slate-100">{formatNum(row.meta)}</td>
                  <td className="px-3 py-2.5 text-center border-r border-slate-100 font-bold">{row.servicios}</td>

                  {/* Ventas */}
                  <td className="px-2 py-2.5 text-right font-mono border-r border-slate-100 font-semibold text-slate-700">{formatNum(row.ventasAdicionales)}</td>
                  <td className="px-2 py-2.5 text-right font-mono border-r border-slate-100 font-semibold text-slate-700">{formatNum(row.ventasSinAdicionales)}</td>

                  {/* Instalados */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.instaladoAdiciones)}</span>
                      <span className="text-[10px] font-bold text-emerald-700 w-11 text-center leading-none tracking-tighter">{pInstCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.instalado)}</span>
                      <span className="text-[10px] font-bold text-emerald-700 w-11 text-center leading-none tracking-tighter">{pInstSin}</span>
                    </div>
                  </td>

                  {/* Pendientes */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.pendienteAdiciones)}</span>
                      <span className="text-[10px] font-bold text-amber-700 w-11 text-center leading-none tracking-tighter">{pPendCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.pendiente)}</span>
                      <span className="text-[10px] font-bold text-amber-700 w-11 text-center leading-none tracking-tighter">{pPendSin}</span>
                    </div>
                  </td>

                  {/* Descartados */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-semibold text-rose-600">{formatNum(row.descartadoAdiciones)}</span>
                      <span className="text-[10px] font-bold text-rose-700 w-11 text-center leading-none tracking-tighter">{pDescCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-semibold text-rose-600">{formatNum(row.descartado)}</span>
                      <span className="text-[10px] font-bold text-rose-700 w-11 text-center leading-none tracking-tighter">{pDescSin}</span>
                    </div>
                  </td>

                  {/* Oportunidad */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5 text-blue-800">
                      <span className="font-mono font-bold">{formatNum(row.oportunidad)}</span>
                      <span className="text-[10px] font-bold text-blue-800 w-11 text-center leading-none">{pOport}</span>
                    </div>
                  </td>

                  {/* Digital */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5 text-indigo-800">
                      <span className="font-mono font-bold">{formatNum(row.digital)}</span>
                      <span className="text-[10px] font-bold text-indigo-800 w-11 text-center leading-none">{pDigit}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {totals && (
            <tfoot className="bg-slate-900 text-white font-mono text-[11px]">
              <tr className="divide-x divide-slate-700 border-t-2 border-slate-700">
                <td colSpan="2" className="px-3 py-3 font-black text-center tracking-widest leading-none">TOTAL</td>
                <td className="px-3 py-3 text-right">{formatNum(totals.meta)}</td>
                <td className="px-3 py-3 text-center font-bold">{totals.servicios}</td>
                <td className="px-2 py-3 text-right font-bold">{formatNum(totals.ventasAdicionales)}</td>
                <td className="px-2 py-3 text-right font-bold">{formatNum(totals.ventasSinAdicionales)}</td>
                
                {/* Instalados Total */}
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.instaladoAdiciones)}</span>
                    <span className="text-[10px] font-bold text-emerald-400 w-11 text-center leading-none">{totals.porcInstaladoConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.instalado)}</span>
                    <span className="text-[10px] font-bold text-emerald-400 w-11 text-center leading-none">{totals.porcInstaladoSinAdic}</span>
                  </div>
                </td>

                {/* Pendientes Total */}
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.pendienteAdiciones)}</span>
                    <span className="text-[10px] font-bold text-amber-400 w-11 text-center leading-none">{totals.porcPendienteConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.pendiente)}</span>
                    <span className="text-[10px] font-bold text-amber-400 w-11 text-center leading-none">{totals.porcPendienteSinAdic}</span>
                  </div>
                </td>

                {/* Descartados Total */}
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-white/90">{formatNum(totals.descartadoAdiciones)}</span>
                    <span className="text-[10px] font-bold text-rose-400 w-11 text-center leading-none">{totals.porcDescartadoConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-white/90">{formatNum(totals.descartado)}</span>
                    <span className="text-[10px] font-bold text-rose-400 w-11 text-center leading-none">{totals.porcDescartadoSinAdic}</span>
                  </div>
                </td>

                {/* Oportunidad Total */}
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-white/90">{formatNum(totals.oportunidad)}</span>
                    <span className="text-[10px] font-bold text-blue-400 w-11 text-center leading-none">{totals.porcOportunidad}</span>
                  </div>
                </td>

                {/* Digital Total */}
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-white/90">{formatNum(totals.digital)}</span>
                    <span className="text-[10px] font-bold text-indigo-400 w-11 text-center leading-none">{totals.porcDigital}</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
