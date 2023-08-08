<template>
    <div class="relative w-full">
        <label :for="inputId" v-if="label" class="text-sm block font-medium text-gray-500">{{ label }}</label>
        <input
        :id="inputId"
        :type="type"
        :class="inputClasses"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputValue"
        />
        <div :class='`absolute left-3 ${label ? "top-7" : "top-2"}`' >
            <font-awesome-icon :icon="icon" class="text-md text-purple-400" />
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
      label: String,
      placeholder: String,
      type: {
        type: String,
        default: 'text',
      },
      icon: {
        type: String,
        default: 'user',
      },
      value: String,
    },
    data() {
      return {
        isFocused: false,
        inputValue: this.value,
      };
    },
    computed: {
      inputClasses() {
        return [
          'border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-blue-500 pl-10 py-2 pr-4 focus:outline-none',
          this.isFocused ? 'focus:border-purple-500' : 'border-gray-300',
        ];
      },
      inputId() {
        return `input-${Math.random().toString(36).substring(2, 10)}`;
      },
    },
    watch: {
      inputValue(newValue) {
        this.$emit('input', newValue);
      },
    },
  };
  </script>
  