<template>
    <div class="relative w-full">
      <!-- Adicionando um ícone ao lado do input original -->
      <div class="absolute left-3 top-2">
        <font-awesome-icon :icon="icon" class="text-md text-purple-400" />
      </div>
      <select
        :id="inputId"
        :class="inputClasses"
        @focus="isFocused = true"
        aria-label="Selected tab"
        placeholder="Select an option"
        @blur="isFocused = false"
        v-model="selectedOption"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <!-- Adicionando o segundo input select para adicionar um banco -->
      
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    props: {
      label: String,
      options: Array,
      icon: {
        type: String,
        default: 'user',
      }, 
      value: String,
    },
    data() {
      return {
        isFocused: false,
        selectedOption: this.value,
        selectedBank: '', // Novo data para o segundo input select
      };
    },
    computed: {
      inputClasses() {
        return [
          'border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-blue-500 pl-10 py-2 pr-4 focus:outline-none transition duration-300 ease-in-out',
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
  