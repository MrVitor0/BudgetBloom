<template>
    <div class="md:flex">
        <div class="md:w-1/3 md:pr-4 hidden md:block">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/bbedit.png" alt="Imagem" class="max-w-auto h-full rounded-l-2xl" />
        </div>
        <div class="md:w-2/3 p-5 text-center md:text-start">
            <div>
                <!-- Investment Name -->
                <h2 class="text-xl font-semibold mb-4">Edit Investment</h2>
                <label for="input" class="block mb-2">How much to increase?</label>
                <BBInputHandler>
                  <BBTextInput  :value="investmentName" v-model="investmentName" placeholder="Itaú Unibanco S.a" icon="bank" class="mb-2" />
                </BBInputHandler>
                <!--INVESTMENT TYPE -->
                <div class="relative w-full">
                    <!-- Adicionando um ícone ao lado do input original -->
                    <div class="absolute left-3 top-2">
                      <font-awesome-icon icon="money-bill" class="text-md text-purple-400" />
                    </div>
                    <BBSelectInput
                      :value="investmentType"
                      v-model="investmentType"
                      :options="investmentOptions"
                      placeholder="Select an investment"
                      class="mb-2 pl-9"
                    />
                </div>
                <!--INITIAL VALUES -->
                <div class="md:flex md:mb-3">
                  <div class="relative w-full pr-2 text-start ">
                    <label for="input" class="block mb-1 mt-3">Current Budget</label>
                    <div class="absolute left-3 pt-11 -translate-y-1/2">
                      <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                    </div>
                    <BBPriceInput :value="initialAport" v-model="initialAport" class="pl-8 rounded-lg" />
                  </div>
                  <div class="relative w-full text-start">
                    <label for="input" class="block mb-1 mt-3">Current Objetive</label>
                    <div class="absolute left-3 pt-11 -translate-y-1/2">
                      <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                    </div>
                    <BBPriceInput :value="nearestObjetive" v-model="nearestObjetive" class="pl-8 rounded-lg" />
                  </div>
                </div>
                <!--SHORT DESCRIPTION -->
                <div class="relative w-full">
                    <!-- Adicionando um ícone ao lado do input original -->
                    <div class="absolute left-3 top-2">
                      <font-awesome-icon icon="comment" class="text-md text-purple-400" />
                    </div>
                    <BBTextArea 
                      :value="description"
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
  import BBInputHandler from '@/components/form/common/BBInputHandler';
  import BBTextInput from '@/components/form/BBTextInput.vue';
  import BBSelectInput from '@/components/form/BBSelectInput.vue';
  import BBTextArea from '@/components/form/BBTextArea.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import BBMoney from '@/utils/BBMoney'
  
  import investmentsType from '@/mocks/data/investmentsType.json';
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
    props: {
      data: {
        type: Object,
        default: () => null
      }
    },
    mounted() {
      console.log(this.data)
    },
    data() {
      return {
        //form
        description: this.data.description,
        investmentName: this.data.title,
        investmentType: this.data.subtitle,
        initialAport: BBMoney.toRaw(this.data.fromBudget),
        nearestObjetive: BBMoney.toRaw(this.data.toBudget),
        
        investmentOptions: investmentsType,
      };
    },
    methods: {
      ...mapActions('modal', ['hideInputModal']),
      formatCurrency(value) {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(value / 100);
      },
      submitInput() {
        console.log({
          description: this.description,
          investmentName: this.investmentName,
          investmentType: this.investmentType,
          initialAport: BBMoney.toDouble(BBMoney.toRaw(this.initialAport)),
          nearestObjetive: BBMoney.toDouble(BBMoney.toRaw(this.nearestObjetive)),
        })
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
  