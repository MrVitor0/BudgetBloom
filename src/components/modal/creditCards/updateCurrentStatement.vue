<template>
      <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/ccstatement.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-start">
          <h2 class="text-xl font-semibold mb-4">{{ $t('credit.cards.current_statements.popup.title') }}</h2>
          <div>
                <label for="input" class="block mb-2">{{ $t('credit.cards.current_statements.popup.label1.text') }}</label>
                <div class="relative w-full">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="tag" class="text-md text-purple-400" />
                  </div>
                  <BBTextInput placeholder="credit.cards.current_statements.popup.label1.placeholder" v-model="nameInput" class="pl-8" />
                </div>
            </div>
            <div class="lg:pt-3 pt-2">
                <label for="input" class="block mb-2">{{ $t('credit.cards.current_statements.popup.label2.text') }}</label>
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
  import BBTextInput from '@/components/form/BBTextInput.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import BBMoney from '@/utils/BBMoney'
  import PWUtils from '@/utils/PWUtils'
  import { mapActions } from 'vuex';
  export default {
    components: {
      FontAwesomeIcon,
      BBPriceInput,
      BBTextInput
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
        nameInput: ""
      };
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      async submitInput() {
        if(this.inputValue && typeof this.currentStatement == 'object'){
          let inputValue = BBMoney.toDouble(this.inputValue)
          let currentAmount = BBMoney.toDouble(this.currentStatement.amount)
          if(typeof currentAmount !== 'number') currentAmount = 0

          let result = BBMoney.toDouble(currentAmount + inputValue)
          let name = this.nameInput
          console.log({
            inputValue,
            currentAmount,
            currentStatement: this.currentStatement,
            name,
         
          })


          let credit = this.currentStatement.credit
          const response = await this.$api.post('/api/credit/user/bill/purchase/create', {
            name: name,
            amount: inputValue,
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
            month: this.currentStatement.month,
            reference: response?.data?.bill.reference,
            updatedAt: response?.data?.bill.updatedAt,
            createdAt: response?.data?.bill.createdAt,
          }

          PWUtils.PWNotification('success', 'Statement Saved!');
          this.$emit('updateCurrentStatement', newStatement);
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
  