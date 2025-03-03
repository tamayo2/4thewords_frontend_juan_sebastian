import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Función para realizar reintentos en caso de error en una petición API.
 * @param {Function} requestFn - La función de la solicitud que se va a reintentar.
 * @param {number} retries - El número de intentos restantes.
 * @returns {Promise} La promesa de la solicitud.
 */
const retryRequest = async (requestFn, retries = MAX_RETRIES) => {
  try {
    return await requestFn();
  } catch (error) {
    const statusCode = error.response?.status;

    if ([400, 401, 403, 404].includes(statusCode)) {
      console.error("Error irrecuperable, no se reintentará:", statusCode);
      throw error;
    }

    if (retries > 0) {
      console.warn(`Reintentando... Quedan ${retries} intentos`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return retryRequest(requestFn, retries - 1);
    } else {
      console.error("Error después de múltiples intentos:", error.response?.data || error.message);
      throw error;
    }
  }
};

/**
 * Obtener todas las leyendas.
 * @returns {Promise} Promesa con la respuesta de la solicitud.
 */
export const getLegends = async () => {
  return retryRequest(() => api.get("/leyendas"));
};

/**
 * Obtener una leyenda por su ID.
 * @param {string|number} id - El ID de la leyenda a obtener.
 * @returns {Promise} Promesa con la respuesta de la solicitud.
 */
export const getLegendById = async (id) => {
  return retryRequest(() => api.get(`/leyendas/${id}`));
};

/**
 * Crear una nueva leyenda.
 * @param {Object} legendData - Datos de la leyenda a crear.
 * @returns {Promise} Promesa con la respuesta de la solicitud.
 */
export const createLegend = async (legendData) => {
  return retryRequest(() => api.post("/leyendas", legendData));
};

/**
 * Actualizar una leyenda existente.
 * @param {string|number} id - El ID de la leyenda a actualizar.
 * @param {Object} legendData - Los nuevos datos de la leyenda.
 * @returns {Promise} Promesa con la respuesta de la solicitud.
 */
export const updateLegend = async (id, legendData) => {
  return retryRequest(() => api.put(`/leyendas/${id}`, legendData));
};

/**
 * Eliminar una leyenda.
 * @param {string|number} id - El ID de la leyenda a eliminar.
 * @returns {Promise} Promesa con la respuesta de la solicitud.
 */
export const deleteLegend = async (id) => {
  return retryRequest(() => api.delete(`/leyendas/${id}`));
};

export default api;
