<template>
  <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:block">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbupdate.png" alt="Imagem" class="max-w-auto h-full rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <!-- Investment Name -->
              <h2 class="text-xl font-semibold mb-4">Track New Aport</h2>
              <label for="input" class="block mb-2">What is the investment?</label>
              <!--INVESTMENT TYPE -->
              <div class="relative w-full">
                  <!-- Adicionando um ícone ao lado do input original -->
                  <div class="absolute left-3 top-2">
                    <font-awesome-icon icon="money-bill" class="text-md text-purple-400" />
                  </div>
                  <BBSelectInput
                    v-model="investmentSelection"
                    :options="investmentOptions"
                    placeholder="Select an investment"
                    class="mb-2 pl-9"
                  />
              </div>
              <!--INITIAL VALUES -->
              <div class="md:flex md:mb-3">
                <div class="relative w-full pr-2 text-start ">
                  <label for="input" class="block mb-1 mt-3">How much is the new aport?</label>
                  <div class="absolute left-3 pt-10 -translate-y-1/2">
                    <FontAwesomeIcon icon="money-bill-trend-up" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="initialAport" class="pl-9 rounded-lg" />
                </div>
              </div>
              <!--SHORT DESCRIPTION -->
              <div class="relative w-full">
                  <!-- Adicionando um ícone ao lado do input original -->
                  <div class="absolute left-3 top-2">
                    <font-awesome-icon icon="comment" class="text-md text-purple-400" />
                  </div>
                  <BBTextArea 
                    v-model="description" 
                    maxlength="75"
                    placeholder="Please, inform a short comment. Up to 75 characters."
                  />
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
import BBSelectInput from '@/components/form/BBSelectInput.vue';
import BBTextArea from '@/components/form/BBTextArea.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BBMoney from '@/utils/BBMoney'
import { mapActions } from 'vuex';
import PWUtils from '@/utils/PWUtils';
export default {
  components: {
    FontAwesomeIcon,
    BBPriceInput,
    BBSelectInput,
    BBTextArea,
  },
  props: {
    data: {
        type: Object,
        default: () => null
    },
    investments: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      //form
      description: '',
      investmentSelection: '',
      initialAport: 0,
      investmentOptions: []
    };
  },
  mounted() {
    this.investmentOptions = this.investments.map((investment) => {
      return {
        label: investment.title,
        date: investment.fromDate,
        value: investment.id,
      }
    })
    //filter investmentOptions by date desc
    this.investmentOptions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  },
  methods: {
    ...mapActions('modal', ['hideInputModal']),
    submitInput() {
      //find in investments array the investment with the same id as investmentSelection
      const investment = this.investments.find((investment) => {
        return investment.id === this.investmentSelection;
      });

      if(investment && this.initialAport) {
          const initialAport = parseFloat(BBMoney.toDouble(this.initialAport));
          const originalFromBudget = parseFloat(BBMoney.toDouble(investment.fromBudget))
          const updatedInvestment = {
            ...investment,
            fromDate: PWUtils.getCurrentDate(),
            toAport: parseFloat(investment.toAport) + 1,
            fromBudget: (initialAport + originalFromBudget).toFixed(2)
          };
          this.$api.put(`/investments/${updatedInvestment.id}`, updatedInvestment).then(() => {
            PWUtils.PWNotification('success', 'Track Saved Successfully!');
            this.$emit('updateTask', updatedInvestment);
            this.hideModal();
          }).catch((error) => {
            console.error('Erro ao salvar aporte:', error);
          });
      }else{
        PWUtils.PWNotification('warning', 'Fill all fields!');
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
