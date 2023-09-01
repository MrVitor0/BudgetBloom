<template>
      <Multiselect  
        class="block border-none focus:bg-gray-100 w-full cursor-pointer "
        :mode="mode"
        placeholder="Júlia, Antônio, João, Mari"
        v-model="value"
        :options="fetchUsers"
        label="name"
        valueProp="name"
      />
  </template>
  
  <script>
    import Multiselect from '@vueform/multiselect'
    import PWUtils from '@/utils/PWUtils'
    export default {
      components: {
        Multiselect,
      },
      data() {
        return {
          value: null,
          mode: 'tags',
          options: [],
        }
      },
      methods : {
        async fetchUsers() {
          try {
            const response = await this.$api.get('/api/user/list')
            this.options = response.data
          } catch (error) {
            PWUtils.PWNotification('error', error.message)
          }
          return this.options
        },
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
