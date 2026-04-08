import React from 'react';
import { calcPercentage } from '../utils/calculations';

const Table = ({ rows, totals, title }) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      {title && <h4 className="text-lg font-bold text-gray-700 mb-3">{title}</h4>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-100">
            <tr>
              <th className="px-5 py-4 font-semibold">Ubicación</th>
              <th className="px-5 py-4 font-semibold text-center">Tipo</th>
              <th className="px-5 py-4 font-semibold text-right">Meta</th>
              <th className="px-5 py-4 font-semibold text-right">V. Adic</th>
              <th className="px-5 py-4 font-semibold text-right">V. Sin Adic</th>
              <th className="px-5 py-4 font-semibold text-right">Serv</th>
              <th className="px-5 py-4 font-semibold text-right">Inst</th>
              <th className="px-5 py-4 font-semibold text-right">% Inst</th>
              <th className="px-5 py-4 font-semibold text-right">Pend</th>
              <th className="px-5 py-4 font-semibold text-right text-blue-600">Avance</th>
              <th className="px-5 py-4 font-semibold text-center">Oportunidad </th>
              <th className="px-5 py-4 font-semibold text-center">Porcentaje Oportunidad</th>
              <th className="px-5 py-4 font-semibold text-center">Digital</th>
              <th className="px-5 py-4 font-semibold text-center">Porcentaje Digital</th>
              <th className="px-5 py-4 font-semibold text-right">Desc</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const porcInstRow = calcPercentage(row.instalado, row.ventasSinAdicionales);
              const avanceRow = calcPercentage(row.instalado, row.meta);

              return (
                <tr key={row.id || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-gray-100/50 transition-colors`}>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{row.ubicacion}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${row.tipo === 'Agencias' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {row.tipo}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.meta}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.ventasAdicionales}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.ventasSinAdicionales}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.servicios}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium">{row.instalado}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{porcInstRow}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.pendiente}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium text-blue-600">{avanceRow}</td>
                  <td className="px-5 py-3.5 text-center font-mono">{row.tipoOportunidad1}</td>
                  <td className="px-5 py-3.5 text-center font-mono">{row.tipoOportunidad2}</td>
                  <td className="px-5 py-3.5 text-center font-mono">{row.tipoOportunidad3}</td>
                  <td className="px-5 py-3.5 text-center font-mono">{row.tipoOportunidad4}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.descartado}</td>
                </tr>
              );
            })}
          </tbody>
          {totals && (
            <tfoot className="bg-gray-800 text-white">
              <tr className="divide-x divide-gray-700">
                <td className="px-5 py-3 font-bold text-xs uppercase">Total {title || 'Ubicación'}</td>
                <td className="px-5 py-3 text-center text-gray-500">-</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.meta}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.ventasAdicionales}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.ventasSinAdicionales}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.servicios}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.instalado}</td>
                <td className="px-5 py-3 text-right font-mono font-bold text-blue-200">{totals.porcentajeInstalado}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.pendiente}</td>
                <td className="px-5 py-3 text-right font-mono font-bold text-blue-300">{totals.avance}</td>
                <td className="px-5 py-3 text-center font-mono font-bold">{totals.tipoOportunidad1}</td>
                <td className="px-5 py-3 text-center font-mono font-bold">{totals.tipoOportunidad2}</td>
                <td className="px-5 py-3 text-center font-mono font-bold">{totals.tipoOportunidad3}</td>
                <td className="px-5 py-3 text-center font-mono font-bold">{totals.tipoOportunidad4}</td>
                <td className="px-5 py-3 text-right font-mono font-bold">{totals.descartado}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
