import axios from "axios";

// Creación de una instancia de Axios para hacer peticiones a la API
const api = axios.create({
  baseURL: "http://127.0.0.1:8080", // URL base para las peticiones
});

// **Manejo de errores global en las respuestas de la API**
// Usamos un interceptor para manejar errores en las respuestas globalmente
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devolvemos
  (error) => {
    // Si ocurre un error, lo manejamos y lo mostramos en la consola
    console.error("Error en la API:", error.response?.data || error.message);
    // Devolvemos el error para que otras funciones puedan manejarlo si es necesario
    return Promise.reject(error);
  }
);

// **Configuración de reintentos**
// Parámetros de reintentos: cantidad máxima de reintentos y el retraso entre intentos
const MAX_RETRIES = 3; // Número máximo de reintentos en caso de error
const RETRY_DELAY = 1000; // Tiempo de espera (en ms) antes de reintentar la petición

/**
 * Función para realizar reintentos en caso de error en una petición API.
 * @param {Function} requestFn - La función de la solicitud que se va a reintentar.
 * @param {number} retries - El número de intentos restantes.
 * @returns {Promise} La promesa de la solicitud.
 */
const retryRequest = async (requestFn, retries = MAX_RETRIES) => {
  try {
    // Intentamos ejecutar la función de solicitud
    return await requestFn();
  } catch (error) {
    // Obtenemos el código de estado HTTP en caso de error
    const statusCode = error.response?.status;

    // Si el error es irrecuperable (errores 400, 401, 403, 404), no reintentamos
    if ([400, 401, 403, 404].includes(statusCode)) {
      console.error("Error irrecuperable, no se reintentará:", statusCode);
      throw error; // Lanzamos el error para que no intente nuevamente
    }

    // Si aún hay intentos restantes, reintentamos la solicitud
    if (retries > 0) {
      console.warn(`Reintentando... Quedan ${retries} intentos`);
      // Esperamos un tiempo antes de hacer el siguiente intento
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      // Realizamos el reintento con el número de intentos restantes
      return retryRequest(requestFn, retries - 1);
    } else {
      // Si ya no hay intentos restantes, mostramos el error final
      console.error("Error después de múltiples intentos:", error.response?.data || error.message);
      throw error; // Lanzamos el error después de todos los intentos fallidos
    }
  }
};

// **Funciones de la API**

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

// Exportamos la instancia de la API para su uso en otros módulos
export default api;
