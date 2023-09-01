<template>
      <Multiselect  
        class="block border-none focus:bg-gray-100 w-full cursor-pointer "
        :mode="mode"
        placeholder="Júlia, Antônio, João, Mari"
        v-model="value"
        :options="options"
        label="name"
        valueProp="id"
      />
  </template>
  
  <script>
    import Multiselect from '@vueform/multiselect'
    export default {
      components: {
        Multiselect,
      },
      props: {
        options: {
          type: [Object, Function],
          required: true
        }
      },
      data() {
        return {
          value: null,
          mode: 'tags',
        }
      },
   
      watch: {
        value() {
         if(this.value.length > 1){
            this.mode = 'multiple'
         }else{
            this.mode = 'tags'
         }
        }
      }
    }
  </script>
  
<style src="@/assets/css/multiselect.css"></style>
