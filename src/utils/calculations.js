export const calcPercentage = (part, whole) => {
  if (!whole || whole === 0) return "0%";
  return `${((part / whole) * 100).toFixed(1)}%`;
};

export const calculateTotals = (rows) => {
  const totals = rows.reduce(
    (acc, row) => {
      acc.meta += row.meta || 0;
      acc.ventasAdicionales += row.ventasAdicionales || 0;
      acc.ventasSinAdicionales += row.ventasSinAdicionales || 0;
      acc.servicios += row.servicios || 0;
      acc.instalado += row.instalado || 0;
      acc.pendiente += row.pendiente || 0;
      acc.tipoOportunidad1 += row.tipoOportunidad1 || 0;
      acc.tipoOportunidad2 += row.tipoOportunidad2 || 0;
      acc.tipoOportunidad3 += row.tipoOportunidad3 || 0;
      acc.tipoOportunidad4 += row.tipoOportunidad4 || 0;
      acc.descartado += row.descartado || 0;
      acc.instaladoAdiciones += row.instaladoAdiciones || 0;
      acc.pendienteAdiciones += row.pendienteAdiciones || 0;
      return acc;
    },
    {
      meta: 0,
      ventasAdicionales: 0,
      ventasSinAdicionales: 0,
      servicios: 0,
      instalado: 0,
      pendiente: 0,
      tipoOportunidad1: 0,
      tipoOportunidad2: 0,
      tipoOportunidad3: 0,
      tipoOportunidad4: 0,
      descartado: 0,
      instaladoAdiciones: 0,
      pendienteAdiciones: 0
    }
  );

  totals.porcentajeInstalado = calcPercentage(totals.instalado, totals.ventasSinAdicionales);
  totals.avance = calcPercentage(totals.instalado, totals.meta);

  return totals;
};
