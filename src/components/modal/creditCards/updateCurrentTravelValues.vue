<template>
    <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:flex">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbtravel.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div v-if="purchaseStep === 1">
              <h2 class="text-xl font-semibold mb-4">Adicionar nova compra</h2>
              <label for="input" class="block mb-2">Informe os detalhes da compra.</label>
              <div class="flex items-center mt-5">
                <div class="relative w-1/2 mr-1 ">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                  </div>
                  <BBPriceInput v-model="inputValue" class="pl-8 flex-grow" />
                </div>
                <div class="relative w-1/2">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon="tags" class="text-lg pt-2 text-purple-400" />
                  </div>
                  <div class="flex w-full border">
                    <BBTextInput placeholder="Título (Tag)" v-model="purchaseName" type="text" class="rounded-none border-none" />
                  </div>
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
              <div v-if="!isChecked && userValues.length > 1" >
                <label class="block mb-2 mt-3">Valor por pessoa:</label>
                <div v-for="(user, index) in userValues" :key="index" class="relative w-full">
                  <div class="flex items-center mt-5">
                    <div class="relative w-1/2  mr-1 ">
                      <div class="absolute left-3 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon="user" class="text-lg pt-2 text-purple-400" />
                      </div>
                      <div class="flex w-full border">
                        <BBTextInput type="text" icon="user" class="rounded-none" readonly :value="user.name" /> 
                      </div>
                    </div>
                    <div class="relative w-1/2">
                      <div class="absolute left-3 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                      </div>
                      <BBPriceInput :inputId="`currency-input${user.id}`" @update="handleUpdate($event, user.id)" :value="user.value" class="pl-6 no-left-border" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative w-full mt-3"> 
                <BBCheckbox :value="isChecked" label="Dividir o valor igualmente" @update="(value) => this.isChecked = value" />
              </div>
          </div>
          <div v-else-if="purchaseStep === 2">
            <h2 class="text-xl font-semibold mb-4">Detalhes Adicionais</h2>
            <label for="input" class="block ">Os valores serão enviados a quem?</label>
            <p class="text-xs">Ao clicar em <b>salvar</b> os valores informados serão registrados como débitos à pessoa que for informada nesta caixa.</p>
            <div class="flex items-center mt-5">
              <div class="w-screen relative mr-1 ">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="dollar-sign" class="text-md text-purple-400" />
                </div>
                <BBSelectInput  
                    v-model="payTarget"
                    labelKey="name"
                    valueKey="id"
                    :options="userValues"
                    placeholder="Informe o pagador"
                    class="pl-8 flex-grow" />
              </div>
            </div>
          </div>
          <div class="mt-4">
              <button
                  class="bg-purple-800 text-white px-4 py-2 rounded-md  hover:bg-purple-700"
                  @click="submitForm(purchaseStep)"
              >
                  {{ purchaseStep < maxPurchaseStep ? "Avançar" : "Salvar" }} 
                  <FontAwesomeIcon v-if="purchaseStep < maxPurchaseStep" class="pl-1" icon="arrow-right" />
                  <FontAwesomeIcon v-else class="pl-1" icon="save" />
              </button>
              <button
                  class="ml-2 border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  @click="closeModal"
              >
              {{ purchaseStep == 1 ? "Fechar" : "Cancelar" }} <FontAwesomeIcon class="pl-1" icon="times" />
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
import BBSelectInput from '@/components/form/BBSelectInput.vue';
export default {
  components: {
    FontAwesomeIcon,
    BBMultiSelect,
    BBCheckbox,
    BBPriceInput,
    BBTextInput,
    BBSelectInput
},
  data() {
    return {
      purchaseStep: 1,
      maxPurchaseStep: 2,
      //General
      isChecked: true,
      inputValue: 0,
      purchaseName: "",
      payTarget: null,
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

    async RunStepOne(){
        if(this.isChecked){
          this.updateUsers()
        }
        this.validateInput();
    },
    async RunStepTwo(){
        if(this.isChecked){
          this.updateUsers()
        }
        console.log(this.payTarget)
        this.validateInput();
        await this.$api.post("/api/travel/purchase/create", {
          name: this.purchaseName,
          amount: BBMoney.toDouble(this.inputValue),
          payerId: this.payTarget,
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
          throw new Error(err?.response?.data?.error);
        });
    },
    /**
     * @description Submit the input to the API
     * @param {Number} _purchaseStep
     * @returns {void}
     */
    async submitForm(_purchaseStep) {
      try {
        if(_purchaseStep === 1){
          await this.RunStepOne();
          this.purchaseStep++;
        }
        else if(_purchaseStep === 2){
          await this.RunStepTwo()
        }
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
        throw new Error('A soma dos valores não é igual ao valor total da compra.');
      }

      if (this.purchaseName === '') {
        throw new Error('Informe o nome da compra.');
      }

      if (this.usersEnvolved.length === 0) {
        throw new Error('Selecione os usuários envolvidos.');
      }

      if (this.inputValue === 0) {
        throw new Error('Informe o valor da compra.');
      }

      if(this.purchaseStep === 2){
        if(!this.payTarget){
          throw new Error('Informe o pagador.');
        }
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