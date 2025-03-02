<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
        :id="id"
        :value="modelValue"
        rows="4"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white"
        required
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    id: String,
    label: String
  }
};
</script>
