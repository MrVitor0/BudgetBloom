<template>
    <div class="bg-white shadow-md rounded-3xl p-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-1">{{ title }}</h2>
        <p class="text-gray-600 text-3xl">{{ amount }} <span class="text-green-500 text-sm ml-1">{{ percentage }}</span></p>
      </div>
      <div>
        <button :class="gradientClass" class="text-white w-12 h-12 rounded-full flex items-center justify-center">
          <font-awesome-icon :icon="icon" class="text-lg" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    props: {
      title: String,
      amount: String,
      percentage: String,
      icon: String,
      color: String, // Adicione a prop para a cor do degradê
    },
    computed: {
        gradientClass() {
        switch (this.color) {
            case 'blue':
            return 'bg-gradient-to-tr from-blue-900 to-blue-500 hover:from-blue-800 hover:to-blue-600';
            case 'red':
            return 'bg-gradient-to-tr from-red-900 to-red-500 hover:from-red-800 hover:to-red-600';
            case 'green':
            return 'bg-gradient-to-tr from-green-900 to-green-500 hover:from-green-800 hover:to-green-600';
            case 'purple':
            return 'bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-600';
            default:
            if (this.color && this.color.startsWith('bg-gradient-to-tr')) {
                return this.color;
            } else {
                return 'bg-blue-500 hover:bg-blue-600'; // Cor padrão
            }
        }
      },
    },
  }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos, se necessário */
  </style>
  