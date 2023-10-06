<template>
      <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:flex">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/ccstatement.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <h2 class="text-xl font-semibold mb-4">{{ $t('credit.cards.past_statements.popup.title') }}</h2>
                <label for="input" class="block my-2">{{ $t('credit.cards.past_statements.popup.label1.text') }}</label>
                <div class="relative w-full">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="calendar-days" class="text-md text-purple-400" />
                  </div>
                  <div class="flex w-full bg-gray-200 ">
                    <BBDateInput type="Month" v-model="monthInput" /> 
                    <div class="border-r border-gray-300 my-3 "></div> 
                    <BBDateInput type="Year" v-model="yearInput"  />
                  </div>
                </div>

                <label for="input" class="block my-2">{{ $t('credit.cards.past_statements.popup.label2.text') }}</label>
                <div class="relative w-full">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="tag" class="text-md text-purple-400" />
                  </div>
                  <BBTextInput placeholder="credit.cards.current_statements.popup.label1.placeholder" v-model="nameInput" class="pl-8" />
                </div>
             

                <label for="input" class="block my-2">{{ $t('credit.cards.past_statements.popup.label3.text') }}</label>
                <div class="relative w-full ">
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
                {{ $t('credit.cards.button') }}  <FontAwesomeIcon class="pl-1" icon="save" />
                </button>
                <button
                    class="ml-2 border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    @click="closeModal"
                >
                {{ $t('credit.cards.close') }} <FontAwesomeIcon class="pl-1" icon="times" />
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
  import BBPriceInput from '@/components/form/BBPriceInput';
  import BBDateInput from '@/components/form/BBDateInput';
  import BBMoney from '@/utils/BBMoney'
  import PWUtils from '@/utils/PWUtils'
  import BBTextInput from '@/components/form/BBTextInput.vue';
  import { mapActions } from 'vuex';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    components: {
      FontAwesomeIcon,
      BBDateInput,
      BBTextInput,
      BBPriceInput,
    },
    data() {
      return {
        inputValue: 0,
        monthInput: (new Date()).getMonth() + 1,
        yearInput: (new Date()).getFullYear(),
      };
    },
    props: {
      statements: {
        type: Object,
        default:  () => ({})
      },
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      async submitInput() {
        if(this.inputValue && typeof this.statements == 'object' && this.monthInput && this.yearInput){

          let inputValue = BBMoney.toDouble(this.inputValue)

          let date = PWUtils.createNewBillDate(this.monthInput, this.yearInput)
          const _date = date.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
          //find the index of the current statement and update in the array
          let index = this.statements.findIndex(item => item.reference.slice(0, 7) === _date)

          let currentAmount = BBMoney.toDouble(this.statements[index]?.amount || 0)
          if(typeof currentAmount !== 'number') currentAmount = 0
          let result = BBMoney.toDouble(currentAmount + inputValue)
          let name = this.nameInput
       
          let credit = this.statements[index]?.credit || []
          const response = await this.$api.post('/api/credit/user/bill/purchase/create', {
            name: name,
            amount: inputValue,
            reference: date
          })
          credit.push({
            amount: response?.data?.purchase.amount,
            name: response?.data?.purchase.name,
            id: response?.data?.purchase.id,
            id_credit: response?.data?.bill.id,
            reference: response?.data?.purchase.reference,
            updatedAt: response?.data?.bill.updatedAt,
            //because the createdAt is the same as the bill updatedAt
            createdAt: response?.data?.bill.updatedAt,
          })
          let newStatement = {
            amount: result,
            credit: credit,
            id: response?.data?.bill.id,
            isClosed: false,
            isPaid: false,
            month: date,
            reference: response?.data?.bill.reference,
            updatedAt: response?.data?.bill.updatedAt,
            createdAt: response?.data?.bill.createdAt,
          }
          PWUtils.PWNotification('success', this.$t('credit.cards.saved'));
          this.$emit('updateStatement', newStatement);
          this.hideModal();
          return response
        }else{
          PWUtils.PWNotification('warning', this.$t('credit.cards.warning'));
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
  