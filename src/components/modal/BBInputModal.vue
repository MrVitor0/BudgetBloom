<template>
    <BBModal v-if="isInputModalVisible" @close="hideModal">
        <div class="flex">
            <div class="w-1/3 pr-4">
                <!-- Coloque sua imagem aqui -->
                <img src="@/assets/ccstatement.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
            </div>
            <div class="w-2/3 p-5">
                <div>
                    <h2 class="text-xl font-semibold mb-4">Increase Statement</h2>
                    <label for="input" class="block mb-2">How much to increase?</label>
                    <BBPriceInput v-model="inputValue" />
                </div>
                <div class="mt-4">
                    <button
                        class="bg-purple-800 text-white px-4 py-2 rounded-md  hover:bg-purple-700"
                        @click="submitInput"
                    >
                        Save  <FontAwesomeIcon class="pl-1" icon="save" />
                    </button>
                    <button
                        class="ml-2 border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                        @click="closeModal"
                    >
                        Close <FontAwesomeIcon class="pl-1" icon="times" />
                    </button>
                </div>
            </div>
        </div>
    </BBModal>
</template>
  
<script>
  import BBModal from './BBModal.vue';
  import BBPriceInput from '@/components/form/BBPriceInput';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { mapState, mapActions } from 'vuex';
  export default {
    components: {
      BBModal,
      FontAwesomeIcon,
      BBPriceInput
    },
    computed: {
        ...mapState('modal', ['isInputModalVisible'])
    },
    data() {
      return {
        inputValue: 0
      };
    },
    watch: {
      inputValue() {
        console.log(this.inputValue)
      }
    },
    methods: {
      ...mapActions('modal', ['showInputModal', 'hideInputModal']),
      submitInput() {
        console.log(this.inputValue)
        if (this.inputValue) {
            this.hideInputModal();
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
  