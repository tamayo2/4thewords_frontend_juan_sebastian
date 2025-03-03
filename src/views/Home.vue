<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4 sm:px-6 lg:px-8 relative">
    <div class="absolute inset-0 z-0 opacity-5 pattern-dots pattern-amber-800 pattern-bg-transparent pattern-size-4"></div>

    <div class="relative z-10 container mx-auto max-w-7xl">
      <header class="mb-12 text-center">
        <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-red-600 to-amber-800">
          Leyendas Costarricenses
        </h1>
        <p class="mt-3 text-lg text-amber-900">Descubre las historias que han dado forma a la cultura de Costa Rica</p>
      </header>

      <div class="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-lg">
        <SearchInput v-model="searchQuery" placeholder="Buscar por nombre, categoría, ubicación..." />
        <router-link to="/create">
          <BaseButton variant="primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Agregar Leyenda
          </BaseButton>
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <LegendCard v-for="legend in filteredLeyendas" :key="legend.id" :legend="legend" @delete="confirmDelete" />
      </div>

      <Notification :message="message" :isError="false" />
      <Notification :message="errorMessage" :isError="true" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getLegends, deleteLegend } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';

import BaseSearchInput from '../components/input/BaseSearchInput.vue';
import LegendCard from '../components/card/LegendCard.vue';
import Notification from '../components/notification/Notification.vue';
import BaseButton from '../components/button/BaseButton.vue';

export default {
  name: 'Home',
  components: {
    SearchInput: BaseSearchInput,
    LegendCard,
    Notification,
    BaseButton
  },
  setup() {
    const leyendas = ref([]);
    const searchQuery = ref('');
    const message = ref(null);
    const errorMessage = ref(null);

    const fetchLeyendas = async () => {
      try {
        const response = await getLegends();
        leyendas.value = response.data;
      } catch (err) {
        errorMessage.value = 'Hubo un error al cargar las leyendas.';
        console.error('Error al cargar leyendas:', err);
      }
    };

    const formatRelativeDate = (dateString) => {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    };

    const filteredLeyendas = computed(() => {
      if (!searchQuery.value) return leyendas.value;
      return leyendas.value.filter((leyenda) => {
        const query = searchQuery.value.toLowerCase();
        return (
            leyenda.name.toLowerCase().includes(query) ||
            leyenda.category.toLowerCase().includes(query) ||
            leyenda.province.toLowerCase().includes(query) ||
            leyenda.canton.toLowerCase().includes(query) ||
            leyenda.district.toLowerCase().includes(query) ||
            formatRelativeDate(leyenda.created_at).toLowerCase().includes(query)
        );
      });
    });

    const confirmDelete = (id) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta leyenda será eliminada permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteConfirmed(id);
        }
      });
    };

    const deleteConfirmed = async (id) => {
      try {
        await deleteLegend(id);
        leyendas.value = leyendas.value.filter((leyenda) => leyenda.id !== id);
        message.value = 'Leyenda eliminada con éxito';

        setTimeout(() => {
          message.value = null;
        }, 3000);
      } catch (err) {
        errorMessage.value = 'Hubo un error al eliminar la leyenda';
        console.error('Error al eliminar leyenda:', err);

        setTimeout(() => {
          errorMessage.value = null;
        }, 3000);
      }
    };

    onMounted(fetchLeyendas);

    return {
      leyendas,
      searchQuery,
      filteredLeyendas,
      confirmDelete,
      message,
      errorMessage
    };
  }
};
</script>

<style scoped>

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.pattern-dots {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
}

.pattern-size-4 {
  background-size: 4px 4px;
}
</style>
