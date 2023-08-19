<template>
    <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/bbspend.png" alt="Imagem" class="max-w-full h-auto  rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <h2 class="text-xl font-semibold mb-4">Edit Expanse Value</h2>
                <label for="input" class="block mb-2">How much you spend?</label>
                <div class="relative w-full mt-3">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="calendar-days" class="text-md text-purple-400" />
                  </div>
                  <div class="flex w-full bg-gray-200 ">
                    <BBDateInput type="Month" v-model="monthInput" /> 
                    <div class="border-r border-gray-300 my-3 "></div> 
                    <BBDateInput type="Year" v-model="yearInput"  />
                  </div>
                </div>
                <div class="relative w-full mt-3">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="inputValue" class="pl-8" />
                </div>
            </div>
            <div class="mt-4">
                <button
                    class="bg-purple-800 text-white px-4 py-2 rounded-md  hover:bg-purple-700"
                    @click="submitInput(false)"
                >
                    Save  <FontAwesomeIcon class="pl-1" icon="save" />
                </button>
                <button
                    class="ml-2 border text-white px-4 py-2 rounded-md bg-purple-800 hover:bg-purple-800"
                    @click="submitInput(true)"
                >
                     Edit Expanses <FontAwesomeIcon class="pl-1" icon="edit" />
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
  import BBDateInput from '@/components/form/BBDateInput';
  import { mapActions } from 'vuex';
  import BBMoney from '@/utils/BBMoney'
  import PWUtils from '@/utils/PWUtils'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    components: {
      FontAwesomeIcon,
      BBDateInput,
      BBPriceInput,
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
        inputValue: 0,
        monthInput: (new Date()).getMonth() + 1,
        yearInput: (new Date()).getFullYear(),
      };
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      async submitInput(hardEdit = false) {
        //!!! This is temporary, will be changed in the future
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();
        //!!! This is temporary, will be changed in the future
        if(this.monthInput == currentMonth && this.yearInput == currentYear && this.inputValue !== '' && this.inputValue !== undefined && this.inputValue !== null){
            const inputValue = BBMoney.toDouble(this.inputValue)
            let account_balance = this.banking_data.account_balance - inputValue
            if(account_balance < 0)  account_balance = 0;
            const updatedData = {
              ...this.banking_data,
                account_balance: account_balance,
                current_expenses: this.banking_data.current_expenses + inputValue,
            }
            if (hardEdit) {
              let response =  await PWUtils.PWPopup('Are you sure?', 'This will directly edit the current incoming value.');
              if(!response) 
                    return;
              updatedData.current_expenses = inputValue;
            }
            try {
              const response = await this.$api.put('banking', updatedData)
              PWUtils.PWNotification('success', 'Expanses Updated!');
              this.$emit('update', {
                value: inputValue,
                hardEdit: hardEdit,
              });
              this.hideModal();
              return response
            } catch (error) {
              PWUtils.PWNotification('error', 'Error while saving the expanse!');
              console.log(error)
            }
        }else{
          PWUtils.PWNotification('warning', 'Please fill all the fields!');
        }
      },
      hideModal() {
        this.hideInputModal();
      }
    }
  };
  </script>
  