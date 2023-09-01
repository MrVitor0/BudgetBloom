<template>
    <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:flex">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbtravel.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <h2 class="text-xl font-semibold mb-4">Adicionar nova compra</h2>
              <label for="input" class="block mb-2">O Valor será divido entre quem?</label>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="users" class="text-md text-purple-400" />
                </div>
                <div class="flex w-full border ">
                  <BBMultiSelect class="ml-10 w-full"  type="Month" v-model="usersEnvolved" /> 
                </div>
              </div>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                </div>
                <BBPriceInput v-model="inputValue" class="pl-8" />
              </div>
              <div class="relative w-full mt-3"> 
                <BBCheckbox :value="isChecked" @update="(value) => this.isChecked = value" />
              </div>
          </div>
          <div class="mt-4">
              <button
                  class="bg-purple-800 text-white px-4 py-2 rounded-md  hover:bg-purple-700"
                  @click="submitInput"
              >
                  Armazenar  <FontAwesomeIcon class="pl-1" icon="save" />
              </button>
              <button
                  class="ml-2 border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  @click="closeModal"
              >
                  Fechar <FontAwesomeIcon class="pl-1" icon="times" />
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import BBPriceInput from '@/components/form/BBPriceInput';
import BBMultiSelect from '@/components/form/BBMultiSelect';
import BBCheckbox from '@/components/form/BBCheckbox.vue';
import BBMoney from '@/utils/BBMoney'
// import PWUtils from '@/utils/PWUtils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  components: {
    FontAwesomeIcon,
    BBMultiSelect,
    BBCheckbox,
    BBPriceInput,
  },
  data() {
    return {
      isChecked: true,
      inputValue: 0,
      usersEnvolved: [],
      yearInput: (new Date()).getFullYear(),
    };
  },
  methods: {
    async submitInput() {
      let usersList = this.usersEnvolved
      let purchaseTotal =  BBMoney.toDouble(this.inputValue)


      console.log({
          usersList,
          purchaseTotal
      })
 
    },
    hideModal() {
      this.$store.dispatch('modal/hideInputModal');
    },
    closeModal() {
      this.hideModal();
    }
  }
};
</script>

