<template>
  <div class="relative w-full sm:w-2/3">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
    </div>
    <input
        :value="modelValue"
        type="text"
        class="w-full pl-10 pr-4 py-3 border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 rounded-lg transition-all duration-300 bg-white bg-opacity-90 text-amber-900 placeholder-amber-400"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: { type: String, default: "Buscar..." }
  }
};
</script>
