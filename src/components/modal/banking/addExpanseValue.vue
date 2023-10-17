<template>
  <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:block">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbspend.png" alt="Imagem" class="max-w-full h-auto  rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <h2 class="text-xl font-semibold mb-4">{{ $t('banking.expanses_card.title') }}</h2>
              <label for="input" class="block mb-2">{{ $t('banking.expanses_card.description') }}</label>
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
                  <FontAwesomeIcon icon="bookmark" class="text-md text-purple-400" />
                </div>
                <BBTextInput :placeholder="$t('banking.expanses_card.placeholder')" v-model="transactionName" class="pl-8" />
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
                  class="bg-purple-800 text-white px-4 py-2 w-full mt-1 md:mt-0 md:w-auto rounded-md  hover:bg-purple-700"
                  @click="submitInput(false)"
              >
                {{ $t('banking.expanses_card.button_one') }}  <FontAwesomeIcon class="pl-1" icon="plus-square" />
              </button>
              <br class="md:hidden" />
              <button
                  class="md:ml-2 border px-4 py-2 w-full mt-1 md:mt-0 md:w-auto rounded-md bg-gray-200 hover:bg-gray-300"
                  @click="hideModal"
              >
                 {{ $t('banking.expanses_card.button_three') }} <FontAwesomeIcon class="pl-1" icon="times" />
              </button>
              <button
                  class="md:ml-2 border text-white px-4 py-2 cursor-not-allowed w-full mt-1 md:mt-0 md:w-auto rounded-md bg-gray-300 hover:bg-gray-300"
                  disabled
                  @click="submitInput(true)"
              >
                 {{ $t('banking.expanses_card.button_two') }} <FontAwesomeIcon class="pl-1" icon="edit" />
              </button> <br class="md:hidden" />
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
import BBTextInput from '@/components/form/BBTextInput.vue';
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
  BBTextInput
},
  data() {
    return {
      transactionName: '',
      inputValue: 0,
      monthInput: (new Date()).getMonth() + 1,
      yearInput: (new Date()).getFullYear(),
    };
  },
  methods: {
    ...mapActions('modal', ['hideInputModal']),
    async submitInput(hardEdit = false) {
      console.log({
        inputValue: this.inputValue,
        transactionName: this.transactionName
      })

      if (this.monthInput && this.yearInput && this.inputValue && this.transactionName ) {
          const inputValue = BBMoney.toDouble(this.inputValue);
          const referenceAt = PWUtils.toISO_8601(this.yearInput, this.monthInput, 0);
          try {
            let payload = {
              type_transaction: 'TRANSFER',
              type_payment: 'MONEY',
              name: this.transactionName,
              referenceAt: referenceAt,
              amount: inputValue,
            }
            const response = await this.$api.post('api/banking/user/transaction/create', payload);
            PWUtils.PWNotification('success', 'Incoming Updated!');
            this.$emit('update', {
              value: inputValue,
              payload: payload,
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
