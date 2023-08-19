<template>
      <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/bbudget.png" alt="Imagem" class="max-w-full h-auto  rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <h2 class="text-xl font-semibold ">Update Account Balance</h2>
                <h5 class="text-danger mb-4">Warning! This will directly update your balance</h5>
                <label for="input" class="block mb-2">What is the new balance?</label>
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
                    @click="hideModal"
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
  import { mapActions } from 'vuex';
  import BBMoney from '@/utils/BBMoney'
  import PWUtils from '@/utils/PWUtils'
  export default {
    components: {
      FontAwesomeIcon,
      BBPriceInput
    },
    props: {
      banking_data: {
        type: Object,
        default: () => {
          return {
            account_balance: 0,
            current_incoming: 0,
            current_expenses: 0
          };
        }
      }
    },
    data() {
      return {
        inputValue: "0"
      };
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      async submitInput() {
        if(this.inputValue) {
          const inputValue = BBMoney.toDouble(this.inputValue)
    
          const updatedData = {
            ...this.banking_data,
              account_balance: inputValue,
          }
          try {
            const response = await this.$api.put('banking', updatedData)
            PWUtils.PWNotification('success', 'Expanses Updated!');
            this.$emit('update', inputValue);
            this.hideModal();
            return response
          } catch (error) {
            PWUtils.PWNotification('error', 'Error while saving the expanse!');
            console.log(error)
          }
        }else{
          PWUtils.PWNotification('error', 'Please enter a valid value!');
        }
      },
      hideModal() {
        this.hideInputModal();
      },
    }
  };
  </script>
  