<template>
  <div v-if="src" class="mt-4">
    <p class="text-sm font-medium text-gray-700 mb-2">Vista previa de la Imagen:</p>
    <div class="relative group">
      <img
          :src="src"
          alt="Vista previa de la imagen"
          class="w-full h-64 object-cover rounded-lg shadow-md transition duration-300 group-hover:opacity-75"
      />
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span class="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">Vista previa</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String
  }
};
</script>
