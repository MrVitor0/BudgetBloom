<template>
    <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:flex">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbtravel.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <h2 class="text-xl font-semibold mb-4">Adicionar nova compra</h2>
              <label for="input" class="block mb-2">Informe os detalhes da compra.</label>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="tags" class="text-lg pt-2 text-purple-400" />
                </div>
                <div class="flex w-full border ">
                  <BBTextInput placeholder="Nome da compra" v-model="purchaseName" type="text" class="rounded-none ml-3 border-none"  /> 
                </div>
              </div>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="users" class="text-md text-purple-400" />
                </div>
                <div class="flex w-full border ">
                  <BBMultiSelect class="ml-10 w-full" :options="fetchUsers"  type="Month" v-model="usersEnvolved" /> 
                </div>
              </div>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                </div>
                <BBPriceInput v-model="inputValue" class="pl-8" />
              </div>

              <div v-if="!isChecked && userValues.length > 1">
                <label class="block mb-2 mt-3">Valor por pessoa:</label>
                <div v-for="(user, index) in userValues" :key="index" class="relative w-full">
                  <div>
                    <div class="relative w-full mt-3">
                      <div class="absolute left-3 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon="user" class="text-md text-purple-400" />
                      </div>
                      <div class="flex w-full bg-gray-200 ">
                        <BBTextInput type="text" icon="user" class="rounded-none no-right-border " readonly :value="user.name" /> 
                        <BBPriceInput :inputId="`currency-input${user.id}`" @update="handleUpdate($event, user.id)" :value="user.value" class="no-left-border" />
                      </div>
                    </div>
                </div>
                </div>
              </div>

              <div class="relative w-full mt-3"> 
                <BBCheckbox :value="isChecked" label="Dividir o valor igualmente" @update="(value) => this.isChecked = value" />
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
import PWUtils from '@/utils/PWUtils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BBTextInput from '@/components/form/BBTextInput.vue';
export default {
  components: {
    FontAwesomeIcon,
    BBMultiSelect,
    BBCheckbox,
    BBPriceInput,
    BBTextInput
},
  data() {
    return {
      isChecked: true,
      inputValue: 0,
      purchaseName: "",
      usersEnvolved: [],
      usersList: [],
      userValues: [],
      yearInput: (new Date()).getFullYear(),
    };
  },
  watch: {
    async isChecked() {
      if(!this.isChecked){
        const response = await PWUtils.PWPopup(
          'Aviso!', 
          'Você desativou a divisão igualitária, por favor informe o valor a ser pago para cada pessoa.', 
          'info',
          "Prosseguir",
          "Cancelar"
        )
        if(!response){
          this.isChecked = true
        }
      }
    },
    usersEnvolved () {
      if(this.usersEnvolved.length > 1){
        this.updateUsers()
      }
    },
    inputValue (newValue, oldValue) {
     //check if value changed
      if(newValue != oldValue){
        this.updateUsers()
      }
    }
  },
  methods: {
    /**
     * @description Update the value of the user with the id
     * @param {@} event 
     * @param {*} id 
     */
    handleUpdate(event, id){
      //update in the userValues array the value of the user with the id
      let user = this.userValues.find(user => user.id == id)
      if(!user){
        PWUtils.PWNotification('error', 'Não foi possível encontrar o usuário')
        return;
      }
      user.value = BBMoney.toCurrency(event)
    },
    /**
     * @description Fetch the users from the API
     * @returns {Array} usersList
    */
    async fetchUsers() {
          try {
            const response = await this.$api.get('/api/user/list')
            this.usersList = response.data
          } catch (error) {
            PWUtils.PWNotification('error', error.message)
          }
          return this.usersList
    },
    /**
     * @description Update the userValues array with the new values
     * @returns {void}
    */
    updateUsers(){
        this.userValues = []
        let purchaseTotal =  BBMoney.toDouble(this.inputValue)
        for (let id of this.usersEnvolved){
          //find from this.usersList the name of the user, they will have the same id
          let user = this.usersList.find(user => user.id == id)
          if(!user){
            PWUtils.PWNotification('error', 'Não foi possível encontrar o usuário')
            return;
          }
          this.userValues.push({
            id: user.id,
            name: user.name,
            value: 0
          })
        }
        if(this.isChecked){
          let value = purchaseTotal / this.usersEnvolved.length
          for (let user of this.userValues){
            user.value = BBMoney.toDouble(value)
          }
        }
    },
    /**
     * @description Submit the input to the API
     * @returns {void}
     */
    async submitInput() {
      try {
        if(this.isChecked){
          this.updateUsers()
        }
        this.validateInput();
        this.$api.post("/api/travel/purchase/create", {
          name: this.purchaseName,
          amount: BBMoney.toDouble(this.inputValue),
          debts: this.userValues.map(user => {
            return {
              id: user.id,
              amount: user.value
            }
          })
        }).then((result) => {
          this.$emit('updateDebtsAmount', result)
          PWUtils.PWNotification('success', 'Compra adicionada com sucesso!');
          this.hideModal();
        }).catch((err) => {
          throw new Error(err.message);
        });
      } catch (error) {
        console.error(error);
        PWUtils.PWNotification('error', error.message);
      }
    },
    validateInput() {
      const purchaseTotal = BBMoney.toDouble(this.inputValue);
      const sum = this.calculateSumWithTwoDecimals();
      const centThreshold = 0.05; // Limite de 1 centavo de diferença

      // Verifica se a diferença entre a soma e o total da compra é maior que o limite de 1 centavo
      if (Math.abs(sum - purchaseTotal) > centThreshold) {
        throw new Error('A soma dos valores não é igual ao valor total da compra');
      }

      if (this.purchaseName === '') {
        throw new Error('Por favor informe o nome da compra');
      }

      if (this.usersEnvolved.length === 0) {
        throw new Error('Por favor selecione os usuários envolvidos');
      }

      if (this.inputValue === 0) {
        throw new Error('Por favor informe o valor da compra');
      }
    },
    calculateSumWithTwoDecimals() {
      return this.userValues.reduce((sum, user) => {
        user.value = BBMoney.toDouble(user.value);
        // Limitar o valor a duas casas decimais
        const limitedValue = parseFloat(user.value.toFixed(2));
        return sum + limitedValue;
      }, 0);
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

<style scoped>
.no-right-border {
  border-right: none;
}
.no-left-border {
  border-left: solid 1px #e2e8f0;
}
</style>