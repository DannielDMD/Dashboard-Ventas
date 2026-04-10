import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData } from '../services/dashboardService';

/**
 * Hook personalizado para gestionar la carga de datos del dashboard,
 * estados de carga y errores.
 */
export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError({
        message: err.message || 'Ocurrió un error inesperado al cargar los datos',
        type: 'CONNECTION_ERROR'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    retry: loadData
  };
};
