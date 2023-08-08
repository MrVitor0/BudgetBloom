<template>
    <div class="bg-white shadow-md rounded-3xl w-full h-full  p-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-1">{{ heading }}</h2>
        <h3 class="my-4 text-3xl">{{ subheading }}</h3>
        <p class="text-gray-600 text-sm">{{ content }}</p>
        <a href="#" class="mt-28  bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white px-4 py-2 rounded-md flex items-center w-40">
          <font-awesome-icon :icon="icon" class="mr-2" />
          {{ linkText }}
        </a>
      </div>
      <div class="pl-10">
        <div class="w-44 h-44 bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-600 flex items-center justify-center rounded-full">
          <img src="@/assets/rocket-white.png" alt="Rocket" class="rounded-full w-20 h-20 object-cover">
        </div>
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
      heading: String,
      subheading: String,
      content: String,
      linkText: String,
      icon: String,
      imageSrc: String,
    },
  }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos, se necessário */
  </style>
  