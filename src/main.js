import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'; 

// Crear la aplicación y montar el componente principal
createApp(App)
  .use(router)  // Usar Vue Router
  .mount('#app')