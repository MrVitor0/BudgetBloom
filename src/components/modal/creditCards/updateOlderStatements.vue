<template>
    <div class="flex">
        <div class="w-1/3 pr-4">
            <!-- Coloque sua imagem aqui -->
            <img src="@/assets/ccstatement.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
        </div>
        <div class="w-2/3 p-5">
            <div>
                <h2 class="text-xl font-semibold mb-4">Update Older Statements</h2>
                <label for="input" class="block mb-2">How much to increase?</label>
                <div class="relative w-full mt-3">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="calendar-days" class="text-md text-purple-400" />
                  </div>
                  <div class="flex w-full bg-gray-200 ">
                    <BBMonthInput type="Month" v-model="monthInput" /> 
                    <div class="border-r border-gray-300 my-3 "></div> 
                    <BBMonthInput type="Year" v-model="yearInput"  />
                  </div>
                </div>
                <div class="relative w-full mt-3">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="inputValue" />
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
  import BBMonthInput from '@/components/form/BBMonthInput';
  import BBMoney from '@/utils/BBMoney'
  import { mapActions } from 'vuex';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    components: {
      FontAwesomeIcon,
      BBMonthInput,
      BBPriceInput,
    },
    data() {
      return {
        inputValue: 0,
        monthInput: "",
        yearInput: "",
      };
    },
    watch: {
      monthInput(newValue) {
        console.log(newValue);
      },
      yearInput(newValue) {
        console.log(newValue);
      }
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
        if(this.inputValue == 0) {
          return;
        }
        let rawValue = this.inputValue.replace(/\D+/g, "");
        console.log({
          from: BBMoney.toCurrency(rawValue, "pt-BR"),
          to: BBMoney.toDouble(rawValue)
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
  