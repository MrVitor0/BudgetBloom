<template>
  <select
    :id="inputId"
    :class="inputClasses"
    @focus="isFocused = true"
    aria-label="Selected tab"
    @blur="isFocused = false"
    v-model="selectedOption"
  >
    <option disabled :value="null">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    icon: {
      type: String,
      default: 'user',
    }, 
    value: String,
    placeholder: String,
  },
  data() {
    return {
      isFocused: false,
      selectedOption: this.value || null, // Inicializar como null se não houver valor definido
      selectedBank: '',
    };
  },
  computed: {
    inputClasses() {
      return [
        'border border-gray-300 rounded-lg w-full px-4 focus:outline-none focus:border-purple-500 py-2 pr-2 focus:outline-none transition duration-300 ease-in-out',
        this.isFocused ? 'focus:border-purple-500 shadow-outline-purple' : 'border-gray-300',
      ];
    },
    inputId() {
      return `input-${Math.random().toString(36).substring(2, 10)}`;
    },
  },
  watch: {
    selectedOption(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
/* Add custom styling here if needed */
</style>
