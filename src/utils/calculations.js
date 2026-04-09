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
      acc.oportunidad += row.oportunidad || 0;
      acc.digital += row.digital || 0;
      acc.descartado += row.descartado || 0;
      acc.descartadoAdiciones += row.descartadoAdiciones || 0;
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
      oportunidad: 0,
      digital: 0,
      descartado: 0,
      descartadoAdiciones: 0,
      instaladoAdiciones: 0,
      pendienteAdiciones: 0
    }
  );

  totals.porcInstaladoConAdic = calcPercentage(totals.instaladoAdiciones, totals.meta);
  totals.porcInstaladoSinAdic = calcPercentage(totals.instalado, totals.meta);
  totals.porcPendienteConAdic = calcPercentage(totals.pendienteAdiciones, totals.meta);
  totals.porcPendienteSinAdic = calcPercentage(totals.pendiente, totals.meta);
  totals.porcDescartadoConAdic = calcPercentage(totals.descartadoAdiciones, totals.meta);
  totals.porcDescartadoSinAdic = calcPercentage(totals.descartado, totals.meta);
  totals.porcOportunidad = calcPercentage(totals.oportunidad, totals.meta);
  totals.porcDigital = calcPercentage(totals.digital, totals.meta);

  return totals;
};
