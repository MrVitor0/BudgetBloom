<template>
    <div class="md:flex">
      <div class="md:w-1/3 md:pr-4 hidden md:flex">
          <!-- Coloque sua imagem aqui -->
          <img src="@/assets/bbtravel.png" alt="Imagem" class="max-w-full h-auto rounded-l-2xl" />
      </div>
      <div class="md:w-2/3 p-5 text-center md:text-start">
          <div>
              <h2 class="text-xl font-semibold mb-4">Add New Purchase</h2>
              <label for="input" class="block mb-2">Who is envolved?</label>
              <div class="relative w-full mt-3">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon="users" class="text-md text-purple-400" />
                </div>
                <div class="flex w-full border ">
                  <BBMultiSelect class="ml-10 w-full"  type="Month" v-model="monthInput" /> 
                </div>
              </div>
              <div class="relative w-full mt-3">
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
import BBMultiSelect from '@/components/form/BBMultiSelect';
import BBMoney from '@/utils/BBMoney'
import PWUtils from '@/utils/PWUtils'
import { mapActions } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  components: {
    FontAwesomeIcon,
    BBMultiSelect,
    BBPriceInput,
  },
  data() {
    return {
      inputValue: 0,
      monthInput: (new Date()).getMonth() + 1,
      yearInput: (new Date()).getFullYear(),
    };
  },
  methods: {
    ...mapActions('modal', ['hideInputModal']),
    async submitInput() {
      //!!! This is temporary, will be changed in the future
      //check if the year and the month are the same as the current date
      let today = new Date();
      let currentMonth = today.getMonth() + 1;
      let currentYear = today.getFullYear();

      console.log({
        monthInput: this.monthInput,
        yearInput: this.yearInput,
        currentMonth: currentMonth,
        currentYear: currentYear
      })

      if(this.monthInput == currentMonth && this.yearInput == currentYear){
        if(this.inputValue !== '' && this.inputValue !== undefined && this.inputValue !== null){
          let inputValue = BBMoney.toDouble(this.inputValue)
          const response = await this.$api.put('creditcard', {
            current_statement:  inputValue
          })
          PWUtils.PWNotification('success', 'Statement Saved!');
          this.$emit('updateStatement', inputValue);
          this.hideModal();
          return response
        }else{
          PWUtils.PWNotification('warning', 'Please fill all the fields!');
        }
      }else{
        this.hideModal()
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
