import { dashboardData } from '../data/mockData';

/**
 * Simula la llamada a la API de 4D Software.
 * En el futuro, aquí se usará fetch() o axios.
 */
export const fetchDashboardData = async () => {
  return new Promise((resolve, reject) => {
    // Simulamos un retraso de red de 2 segundos
    setTimeout(() => {
      // PROBAR ERROR: Descomenta la siguiente línea para forzar un error visual
      //return reject(new Error('No se pudo establecer conexión con el servidor 4D'));

      if (!dashboardData) {
        return reject(new Error('La respuesta de la base de datos está vacía o es inválida'));
      }

      resolve(dashboardData);
    }, 2000);
  });
};
