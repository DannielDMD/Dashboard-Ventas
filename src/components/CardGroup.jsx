import React from 'react';
import Card from './Card';

const CardGroup = ({ totals }) => {
  if (!totals) return null;

  const cardData = [
    { label: "Meta", value: totals.meta },
    { label: "Servicios", value: totals.servicios },
    { label: "Venta con Adicionales", value: totals.ventasAdicionales },
    { label: "Instalado con Adicionales", value: totals.instaladoAdiciones },
    { label: "Pendiente con Adicionales", value: totals.pendienteAdiciones },
    { label: "% Instalación", value: totals.porcentajeInstalado },
    { label: "Instalado sin Adicionales", value: totals.instalado },
    { label: "Pendiente sin Adicionales", value: totals.pendiente },
    { label: "Ventas sin Adicionales", value: totals.ventasSinAdicionales },
    { label: "Descartado", value: totals.descartado }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
      {cardData.map((item, index) => (
        <Card key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default CardGroup;
