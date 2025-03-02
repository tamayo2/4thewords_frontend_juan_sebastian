<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4 sm:px-6 lg:px-8 relative">
    <div class="absolute inset-0 z-0 opacity-5 pattern-dots pattern-amber-800 pattern-bg-transparent pattern-size-4"></div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <header class="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 p-6 text-white">
          <h1 class="text-3xl font-extrabold text-center">
            Crear Nueva Leyenda
          </h1>
        </header>

        <form @submit.prevent="submitForm" class="p-6 space-y-6">
          <BaseInput v-model="leyenda.name" id="name" label="Nombre de la Leyenda" />
          <BaseInput v-model="leyenda.category" id="category" label="Categoría" />
          <BaseInput v-model="leyenda.description" id="description" label="Descripción" isTextArea />
          <BaseInput v-model="leyenda.province" id="province" label="Provincia" />
          <BaseInput v-model="leyenda.canton" id="canton" label="Cantón" />
          <BaseInput v-model="leyenda.district" id="district" label="Distrito" />
          <BaseInput v-model="leyenda.image_url" id="image_url" label="URL de la Imagen" type="url" />

          <BaseImagePreview :src="leyenda.image_url" />

          <BaseInput v-model="leyenda.created_at" id="created_at" label="Fecha de Creación" type="datetime-local" />

          <div class="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <BaseButton type="submit" variant="primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
              Crear Leyenda
            </BaseButton>

            <BaseButton @click="goBack" variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Volver
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createLegend } from '../services/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import BaseInput from '../components/input/BaseInput.vue';
import BaseButton from '../components/button/BaseButton.vue';
import BaseImagePreview from '../components/image/BaseImagePreview.vue';

export default {
  name: 'CreateLegend',
  components: { BaseInput, BaseButton, BaseImagePreview },
  setup() {
    const leyenda = ref({
      name: '',
      category: '',
      description: '',
      province: '',
      canton: '',
      district: '',
      image_url: '',
      created_at: new Date().toISOString().slice(0, 16)
    });

    const router = useRouter();

    const submitForm = async () => {
      try {
        await createLegend(leyenda.value);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Leyenda creada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f59e0b'
        });
        router.push('/');
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear la leyenda.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f59e0b'
        });
        console.error(err);
      }
    };

    const goBack = () => router.go(-1);

    return { leyenda, submitForm, goBack };
  }
};
</script>