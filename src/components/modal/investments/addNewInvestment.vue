<template>
  <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:block">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbtrack.png" alt="Imagem" class="max-w-auto h-full rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <!-- Investment Name -->
              <h2 class="text-xl font-semibold mb-4">{{ $t('investments.popup.title') }}</h2>
              <label for="input" class="block mb-2">{{ $t('investments.popup.description') }}</label>
              <BBInputHandler>
                <BBTextInput v-model="investmentName" :placeholder="$t('investments.popup.label1.placeholder')" icon="bank" class="mb-2" />
              </BBInputHandler>
              <!--INVESTMENT TYPE -->
              <div class="relative w-full">
                  <!-- Adicionando um ícone ao lado do input original -->
                  <div class="absolute left-3 top-2">
                    <font-awesome-icon icon="money-bill" class="text-md text-purple-400" />
                  </div>
                  <BBSelectInput
                    v-model="investmentType"
                    :options="investmentOptions"
                    :placeholder="$t('investments.popup.label2.placeholder')"
                    class="mb-2 pl-9"
                  />
              </div>
              <!--INITIAL VALUES -->
              <div class="md:flex md:mb-3">
                <div class="relative w-full pr-2 text-start ">
                  <label for="input" class="block mb-1 mt-3">{{ $t('investments.popup.label3.text') }}</label>
                  <div class="absolute left-3 pt-11 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="aport" class="pl-8 rounded-lg" />
                </div>
                <div class="relative w-full text-start">
                  <label for="input" class="block mb-1 mt-3">{{ $t('investments.popup.label4.text') }}</label>
                  <div class="absolute left-3 pt-11 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="objetive" class="pl-8 rounded-lg" />
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
                    :placeholder="$t('investments.popup.label5.placeholder')"
                  />
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
import BBInputHandler from '@/components/form/common/BBInputHandler';
import BBTextInput from '@/components/form/BBTextInput.vue';
import BBSelectInput from '@/components/form/BBSelectInput.vue';
import BBTextArea from '@/components/form/BBTextArea.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import investmentsType from '@/mocks/data/investmentsType.json';
import BBMoney from '@/utils/BBMoney'
import PWUtils from '@/utils/PWUtils';
import { mapActions } from 'vuex';
export default {
  components: {
    FontAwesomeIcon,
    BBPriceInput,
    BBSelectInput,
    BBTextArea,
    BBInputHandler,
    BBTextInput
  },
  data() {
    return {
      description: '',
      investmentName: '',
      investmentType: '',
      aport: 0,
      objetive: 0,
      investmentOptions: investmentsType,
    };
  },
  methods: {
    ...mapActions('modal', ['hideInputModal']),
    submitInput() {
      let data = {
          name: this.investmentName,
          subtitle: this.investmentType,
          description: this.description,
          icon: 'money-bill',
          aport: BBMoney.toDouble(this.aport),
          objective: BBMoney.toDouble(this.objetive),
          toAport: 1,
          createdAt: PWUtils.getCurrentDate(),
          updatedAt: PWUtils.getCurrentDate(),
        }
      //check if all fields are filled
      if (this.description && this.investmentName && this.investmentType && this.aport && this.objetive) {
         //format a date to format 03/01/2023
         this.$api.post('/api/investment/create', data).then((response) => {
          data.id = response.data.id;
          data.id_investments = response.data.id_investments;
          this.$emit('newTask', data);
          PWUtils.PWNotification("success", "Investment Tracked!")
          this.hideModal();
        }).catch(() => {
          PWUtils.PWNotification("error", "Something went wrong")
        });
      }else{
        PWUtils.PWNotification("warning", "Fill all fields")
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
