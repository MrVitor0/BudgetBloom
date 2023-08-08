<template>
  <div class="flex items-center">
    <label :for="this.id" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          :id="this.id"
          class="sr-only"
          :checked="isChecked"
          @change="toggle"
        />
        <div
          class="block w-14 h-6 rounded-full transition ease-in-out duration-200"
          :class="{ 'bg-purple-500': isChecked, 'bg-gray-600': !isChecked }"
        ></div>
        <div
          class="dot absolute left-1 top-1 w-4 h-4 rounded-full transition ease-in-out duration-200"
          :class="{ 'bg-white': isChecked, 'bg-gray-300': !isChecked, 'transform translate-x-8': isChecked }"
        ></div>
      </div>
      <div class="ml-3 text-gray-700 font-medium">{{ text }}</div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: Boolean,
    text: {
            type: String,
            default: () => 'Toggle'
     }
  },
  mounted  () {
    this.id = this.randomInputId();
  },
  data() {
    return {
      isChecked: this.initialValue || false,
      id: 'toggle'
    };
  },
  methods: {
    randomInputId() {
      return `input-${Math.random().toString(36).substr(2, 10)}`;
    },
    toggle() {
      this.isChecked = !this.isChecked;
      // this.$emit('change', this.isChecked);
    },
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
