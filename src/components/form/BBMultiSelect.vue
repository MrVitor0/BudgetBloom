<template>
    <div>
      <Multiselect  
        class="block border-none focus:bg-gray-100 w-full cursor-pointer "
        mode="tags"
        placeholder="Select one or more"
        v-model="value"
        :options="options"
      />
    </div>
  </template>
  
  <script>
    import Multiselect from '@vueform/multiselect'
  
    export default {
      components: {
        Multiselect,
      },
      data() {
        return {
          value: null,
          options: [
            'Batman',
            'Robin',
            'Joker',
          ]
        }
      }
    }
  </script>
  
<style src="@/assets/css/multiselect.css"></style>
