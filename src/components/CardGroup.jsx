import React from 'react';
import Card from './Card';

const CardGroup = ({ totals, fullVersion = false }) => {
  if (!totals) return null;

  const cardData = [
    { label: "Meta", value: totals.meta },
    { label: "Ventas Adicionales", value: totals.ventasAdicionales },
    { label: "Ventas Sin Adicionales", value: totals.ventasSinAdicionales },
    { label: "Servicios", value: totals.servicios },
    { label: "Instalado", value: totals.instalado },
    { label: "Pendiente", value: totals.pendiente },
    { label: "% Instalado", value: totals.porcentajeInstalado },
    { label: "Descartado", value: totals.descartado }
  ];

  if (fullVersion) {
    cardData.push(
      { label: "Instalado con Adiciones", value: totals.instaladoAdiciones },
      { label: "Pendiente con Adiciones", value: totals.pendienteAdiciones }
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 ${fullVersion ? 'lg:grid-cols-5' : 'lg:grid-cols-8'} gap-4 mt-6`}>
      {cardData.map((item, index) => (
        <Card key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default CardGroup;
