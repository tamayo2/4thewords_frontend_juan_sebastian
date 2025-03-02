import { createRouter, createWebHistory } from 'vue-router';

// Importa las vistas que se asociarán a las rutas
import Home from '../views/Home.vue';
import LeyendaCreate from '../views/LeyendaCreate.vue';
import LeyendaEdit from '../views/LeyendaEdit.vue';

// Definición de las rutas de la aplicación
const routes = [
  {
    // Ruta principal
    path: '/',  // La ruta '/' es la raíz de la aplicación
    name: 'Home',  // Nombre que se usará para hacer referencia a la ruta
    component: Home,  // Componente que se renderiza cuando la ruta es visitada
  },
  {
    // Ruta para crear una nueva leyenda
    path: '/create',  // Ruta '/create' para crear una nueva leyenda
    name: 'CreateLeyenda',  // Nombre de la ruta
    component: LeyendaCreate,  // Componente de creación de leyendas
  },
  {
    // Ruta para editar una leyenda existente
    path: '/Edit/:id',  // Ruta dinámica con parámetro 'id' para identificar la leyenda a editar
    name: 'LeyendaEdit',  // Nombre de la ruta
    component: LeyendaEdit,  // Componente de edición de leyendas
    props: true,  // Permite pasar el parámetro 'id' como prop al componente
  },
];

// Configuración del router de Vue
const router = createRouter({
  // Configura el modo de navegación con historial de navegador
  history: createWebHistory(),  // `createWebHistory` usa la URL en el historial del navegador
  routes,  // Asocia las rutas definidas al router
});

export default router;  // Exporta el router para ser utilizado en la aplicación
