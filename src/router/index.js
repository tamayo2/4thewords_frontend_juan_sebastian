import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LeyendaCreate from '../views/LeyendaCreate.vue';
import LeyendaEdit from '../views/LeyendaEdit.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'CreateLeyenda',
    component: LeyendaCreate,
  },
  {
    path: '/Edit/:id',
    name: 'LeyendaEdit',
    component: LeyendaEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
