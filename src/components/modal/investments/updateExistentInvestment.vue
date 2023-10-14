<template>
  <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:block">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbupdate.png" alt="Imagem" class="max-w-auto h-full rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <!-- Investment Name -->
              <h2 class="text-xl font-semibold mb-4">{{ $t('investments.texts.track_aport') }}</h2>
              <label for="input" class="block mb-2">{{  $t('investments.texts.track_aport_description') }}</label>
              <!--INVESTMENT TYPE -->
              <div class="relative w-full">
                  <!-- Adicionando um ícone ao lado do input original -->
                  <div class="absolute left-3 top-2">
                    <font-awesome-icon icon="money-bill" class="text-md text-purple-400" />
                  </div>
                  <BBSelectInput
                    v-model="investmentSelection"
                    :options="investmentOptions"
                    :placeholder="$t('investments.popup.label2.placeholder')"
                    class="mb-2 pl-9"
                  />
              </div>
              <!--INITIAL VALUES -->
              <div class="md:flex md:mb-3">
                <div class="relative w-full pr-2 text-start ">
                  <label for="input" class="block mb-1 mt-3">{{ $t('investments.popup.label3.text') }}</label>
                  <div class="absolute left-3 pt-10 -translate-y-1/2">
                    <FontAwesomeIcon icon="money-bill-trend-up" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="aport" class="pl-9 rounded-lg" />
                </div>
              </div>
          </div>
          <div class="mt-4">
              <button
                  class="bg-purple-800 text-white px-4 py-2 rounded-md  hover:bg-purple-700"
                  @click="submitInput"
              >
                  {{ $t('investments.generic.save') }}  <FontAwesomeIcon class="pl-1" icon="save" />
              </button>
              <button
                  class="ml-2 border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  @click="closeModal"
              >
                  {{ $t('investments.generic.close') }} <FontAwesomeIcon class="pl-1" icon="times" />
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import BBPriceInput from '@/components/form/BBPriceInput';
import BBSelectInput from '@/components/form/BBSelectInput.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BBMoney from '@/utils/BBMoney'
import { mapActions } from 'vuex';
import PWUtils from '@/utils/PWUtils';
export default {
  components: {
    FontAwesomeIcon,
    BBPriceInput,
    BBSelectInput,
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
      investmentSelection: '',
      aport: 0,
      investmentOptions: []
    };
  },
  mounted() {
    this.investmentOptions = this.investments.map((investment) => {
      return {
        label: investment.name,
        date: investment.updatedAt,
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

      if(investment && this.aport) {
          const initialAport = BBMoney.toDouble(this.aport);
          const originalFromBudget = BBMoney.toDouble(investment.aport)
          this.$api.put(`/api/investment/edit/${investment.id}`, {
            aport: BBMoney.toDouble(initialAport + originalFromBudget)
          }).then(() => {
            PWUtils.PWNotification('success', 'Track Saved Successfully!');
            this.$emit('updateTask', {
              ...investment,
              aport: initialAport + originalFromBudget
            });
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
