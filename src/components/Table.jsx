import React from 'react';
import { calcPercentage } from '../utils/calculations';

const Table = ({ rows, totals, title }) => {
  const formatNum = (val) => (val || 0).toLocaleString('es-CO');

  return (
    <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {title && (
        <div className="flex items-center gap-3 mb-5 px-1">
          <div className="w-1.5 h-5 bg-slate-300 rounded-full"></div>
          <h4 className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight">{title}</h4>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-xs text-left text-slate-600 border-collapse">
          <thead className="text-[10px] text-white uppercase bg-slate-800 sticky top-0 z-10">
            <tr>
              <th rowSpan="2" className="px-3 py-2 border-b border-r border-slate-700 min-w-[80px]">Tipo</th>
              <th rowSpan="2" className="px-3 py-2 border-b border-r border-slate-700 min-w-[120px]">Ubicación</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-r border-slate-700 tracking-wider">Meta</th>
              <th rowSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700">Servs.</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700 bg-slate-700/50">Ventas</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700 bg-emerald-900/40">Instalados</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700 bg-amber-900/40">Pendientes</th>
              <th colSpan="2" className="px-3 py-2 text-center border-b border-r border-slate-700 bg-rose-900/40">Descartados</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-r border-slate-700 bg-blue-900/40">Oportunidad</th>
              <th rowSpan="2" className="px-3 py-2 text-right border-b border-slate-700 bg-indigo-900/40">Digital</th>
            </tr>
            <tr className="bg-slate-800/90 text-[9px]">
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
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wide ${row.tipo === 'Agencias' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
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
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 w-11 text-center leading-none">{pInstCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.instalado)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 w-11 text-center leading-none">{pInstSin}</span>
                    </div>
                  </td>

                  {/* Pendientes */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.pendienteAdiciones)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 w-11 text-center leading-none">{pPendCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-medium">{formatNum(row.pendiente)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 w-11 text-center leading-none">{pPendSin}</span>
                    </div>
                  </td>

                  {/* Descartados */}
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-semibold text-rose-600">{formatNum(row.descartadoAdiciones)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 w-11 text-center leading-none">{pDescCon}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 border-r border-slate-100">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-semibold text-rose-600">{formatNum(row.descartado)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 w-11 text-center leading-none">{pDescSin}</span>
                    </div>
                  </td>

                  {/* Oportunidad */}
                  <td className="px-2 py-2.5 border-r border-slate-100 bg-blue-50/30">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-bold text-blue-700">{formatNum(row.oportunidad)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 w-11 text-center leading-none">{pOport}</span>
                    </div>
                  </td>

                  {/* Digital */}
                  <td className="px-2 py-2.5 bg-indigo-50/30">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-bold text-indigo-700">{formatNum(row.digital)}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 w-11 text-center leading-none">{pDigit}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {totals && (
            <tfoot className="bg-slate-800 text-white font-mono text-[11px]">
              <tr className="border-t-2 border-slate-600">
                <td colSpan="2" className="px-3 py-3.5 font-black text-center border-r border-slate-700 tracking-widest leading-none">TOTAL</td>
                <td className="px-3 py-3.5 text-right border-r border-slate-700">{formatNum(totals.meta)}</td>
                <td className="px-3 py-3.5 text-center font-bold border-r border-slate-700">{totals.servicios}</td>
                <td className="px-2 py-3.5 text-right font-bold border-r border-slate-700">{formatNum(totals.ventasAdicionales)}</td>
                <td className="px-2 py-3.5 text-right font-bold border-r border-slate-700">{formatNum(totals.ventasSinAdicionales)}</td>

                {/* Instalados Total */}
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.instaladoAdiciones)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 w-11 text-center leading-none">{totals.porcInstaladoConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.instalado)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 w-11 text-center leading-none">{totals.porcInstaladoSinAdic}</span>
                  </div>
                </td>

                {/* Pendientes Total */}
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.pendienteAdiciones)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 w-11 text-center leading-none">{totals.porcPendienteConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{formatNum(totals.pendiente)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 w-11 text-center leading-none">{totals.porcPendienteSinAdic}</span>
                  </div>
                </td>

                {/* Descartados Total */}
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-rose-300">{formatNum(totals.descartadoAdiciones)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 w-11 text-center leading-none">{totals.porcDescartadoConAdic}</span>
                  </div>
                </td>
                <td className="px-2 py-3.5 border-r border-slate-700">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-rose-300">{formatNum(totals.descartado)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 w-11 text-center leading-none">{totals.porcDescartadoSinAdic}</span>
                  </div>
                </td>

                {/* Oportunidad Total */}
                <td className="px-2 py-3.5 border-r border-slate-700 bg-blue-900/20">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-blue-300">{formatNum(totals.oportunidad)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 w-11 text-center leading-none">{totals.porcOportunidad}</span>
                  </div>
                </td>

                {/* Digital Total */}
                <td className="px-2 py-3.5 bg-indigo-900/20">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-indigo-300">{formatNum(totals.digital)}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-300 w-11 text-center leading-none">{totals.porcDigital}</span>
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
