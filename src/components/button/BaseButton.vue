<template>
  <button
      :type="type"
      :class="buttonClass"
      @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "button" },
    variant: { type: String, default: "primary" }, // Agregado para manejar variantes de colores
    onClick: Function
  },
  computed: {
    buttonClass() {
      return {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-black"
      }[this.variant] || "bg-blue-500 hover:bg-blue-600 text-white";
    }
  }
};
</script>

<style scoped>
button {
  @apply w-full sm:w-auto px-6 py-3 font-bold rounded-lg shadow-lg transition duration-300 flex items-center justify-center;
}
</style>
