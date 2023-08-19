<template>
    <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/bbspend.png" alt="Imagem" class="max-w-full h-auto  rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <h2 class="text-xl font-semibold mb-4">Edit Incoming Value</h2>
                <label for="input" class="block mb-2">How much you receive?</label>
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
                    Increase Incoming  <FontAwesomeIcon class="pl-1" icon="plus-square" />
                </button>
                <button
                    class="ml-2 border text-white px-4 py-2 rounded-md bg-purple-800 hover:bg-purple-800"
                    @click="submitInput(true)"
                >
                     Edit Incoming <FontAwesomeIcon class="pl-1" icon="edit" />
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
    components: {
      FontAwesomeIcon,
      BBDateInput,
      BBPriceInput,
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
        if (this.monthInput === currentMonth && this.yearInput === currentYear && this.inputValue !== '' && this.inputValue !== undefined && this.inputValue !== null) {
            const inputValue = BBMoney.toDouble(this.inputValue);
            const updatedData = {
              ...this.banking_data,
              account_balance: this.banking_data.account_balance + inputValue,
              current_incoming: this.banking_data.current_incoming + inputValue,
            };
            if (hardEdit) {
              let response =  await PWUtils.PWPopup('Are you sure?', 'This will directly edit the current incoming value.');
              if(!response) 
                    return;
              updatedData.current_incoming = inputValue;
            }
            try {
              const response = await this.$api.put('banking', updatedData);
              PWUtils.PWNotification('success', 'Incoming Updated!');
              this.$emit('update', {
                value: inputValue,
                hardEdit: hardEdit,
              });
              this.hideModal();
              return response;
            } catch (error) {
              console.error('Error while saving incoming:', error);
              PWUtils.PWNotification('error', 'Error while saving incoming.');
            }
        } else {
          PWUtils.PWNotification('warning', 'Please fill all the fields!');
        }
      },
      hideModal() {
        this.hideInputModal();
      }
    }
  };
  </script>
  