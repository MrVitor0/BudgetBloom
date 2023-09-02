<template>
    <button
      v-if="!disabled"
      :class="PillClass"
      :style="{ transition: clicked ? 'background 0.5s ease-in-out' : '' }"
    >
     <font-awesome-icon v-if="icon !== 'hide'" :icon="icon" class="text-white pr-3" />
      <span class="text-white hover:text-white">{{ text }}</span>
    </button>
    <span
      v-else
      :class="PillClass"
      :style="{ transition: clicked ? 'background 0.5s ease-in-out' : '' }"
    >
    <font-awesome-icon v-if="icon !== 'hide'" :icon="icon" class="text-white pr-3" />
      <span class="text-white hover:text-white">{{ text }}</span>
    </span>
  </template>

  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'BasicPill',
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        clicked: true,
      };
    },
    computed: {
      PillClass() {
        const baseClass = [
          'w-full bg-gray-300 block rounded-lg font-medium cursor-pointer hover:bg-purple-300 transition duration-500 ease-in-out',
          this.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg shadow-md',
          this.size === 'lg' ? 'p-3' : this.size === 'sm' ? 'm-1 p-1 text-center' : 'p-3',
          this.color,
          this.clicked ? 'bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow' : '',
        ];
        return baseClass.join(' ');
      },
    },
    methods: {
    },
    props: {
      text: String,
      size: {
        type: String,
        default: () => 'lg'
      },
      color: {
        type: String,
        default: () => 'gray-300'
      },
      icon: {
        type: String,
        default: () => 'circle'
      },
      active: {
        type: Boolean,
        default: () => true
      },
      disabled: {
        type: Boolean,
        default: () => false
      },
    },
  }
  </script>
  
