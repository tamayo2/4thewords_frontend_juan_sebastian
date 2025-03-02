<template>
  <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <div class="relative overflow-hidden h-64">
      <img :src="legend.image_url" alt="Leyenda" class="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
      <div class="absolute top-0 right-0 m-3">
        <span class="px-3 py-1 bg-amber-500 bg-opacity-90 text-white text-sm font-medium rounded-full">
          {{ legend.category }}
        </span>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    </div>

    <div class="p-6">
      <h2 class="text-2xl font-bold text-amber-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
        {{ legend.name }}
      </h2>
      <p class="text-gray-700 mb-4 line-clamp-3">{{ legend.description }}</p>
      <div class="space-y-2 text-sm text-gray-600 mb-6">
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span><span class="font-medium">{{ legend.province }}</span>, {{ legend.canton }}, {{ legend.district }}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formatDate(legend.created_at) }}</span>
        </div>
      </div>

      <div class="flex justify-between gap-3">
        <router-link :to="`/edit/${legend.id}`" class="flex-1">
          <BaseButton variant="primary">Editar</BaseButton>
        </router-link>
        <BaseButton variant="danger" @click="deleteLegend">Eliminar</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../button/BaseButton.vue";

export default {
  components: { BaseButton },
  props: { legend: Object },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("es-ES");
    },
    deleteLegend() {
      this.$emit("delete", this.legend.id);
    }
  }
};
</script>
