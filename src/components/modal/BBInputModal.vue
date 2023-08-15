<template>
    <BBModal v-if="isInputModalVisible" @close="hideModal">
      <div>
        <h2 class="text-xl font-semibold mb-4">Input Modal</h2>
        <label for="input" class="block mb-2">Digite algo:</label>
        <input
          v-model="inputValue"
          id="input"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <div class="mt-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
            @click="submitInput"
          >
            Enviar
          </button>
          <button
            class="ml-2 border px-4 py-2 rounded-md"
            @click="closeModal"
          >
            Fechar
          </button>
        </div>
      </div>
    </BBModal>
  </template>
  
  <script>
  import BBModal from './BBModal.vue';
  import { mapState, mapActions } from 'vuex';
  export default {
    components: {
      BBModal
    },
    computed: {
        ...mapState('modal', ['isInputModalVisible'])
    },
    data() {
      return {
        inputValue: ''
      };
    },
    methods: {
      ...mapActions('modal', ['showInputModal', 'hideInputModal']),
      submitInput() {
        if (this.inputValue) {
            console.log('Input value:', this.inputValue);
            this.hideModal();
        }
      },
      hideModal() {
        this.hideInputModal();
      },
      closeModal() {
        this.hideModal();
      }
    }
  };
  </script>
  