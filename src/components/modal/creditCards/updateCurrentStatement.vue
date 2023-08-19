<template>
      <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/ccstatement.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <h2 class="text-xl font-semibold mb-4">Increase Statement</h2>
                <label for="input" class="block mb-2">How much to increase?</label>
                <div class="relative w-full">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="inputValue" class="pl-8" />
                </div>
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
</template>
  
<script>
  import BBPriceInput from '@/components/form/BBPriceInput';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import BBMoney from '@/utils/BBMoney'
  import PWUtils from '@/utils/PWUtils'
  import { mapActions } from 'vuex';
  export default {
    components: {
      FontAwesomeIcon,
      BBPriceInput
    },
    props: {
      currentStatement: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        inputValue: 0,
      };
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      async submitInput() {
        if(this.inputValue && this.currentStatement){
          let inputValue = BBMoney.toDouble(this.inputValue)
          let currentStatement = BBMoney.toDouble(this.currentStatement)
          let sum = BBMoney.toDouble(currentStatement + inputValue)
          console.log({
            inputValue,
            currentStatement,
            sum
          })
          const response = await this.$api.put('creditcard', {
            current_statement:  sum
          })
          PWUtils.PWNotification('success', 'Statement Saved!');
          this.$emit('updateCurrentStatement', sum);
          this.hideModal();
          return response
        }else{
          PWUtils.PWNotification('warning', 'Please fill all the fields!');
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
  