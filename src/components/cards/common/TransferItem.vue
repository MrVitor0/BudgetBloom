
<template>
    <!-- ITEM -->
    <div class="flex items-start justify-between text-center md:text-start px-6 md:px-3 mb-5">
          <div class="relative">
              <font-awesome-icon :icon="icon" :class="typeClass" />
              <div class="flex-start md:pl-10">
                  <p class="text-md text-BBDark">{{ name }}</p>
                  <p class="text-xs text-BBDark"><b>{{ method }}</b> {{ type }}</p>
              </div>
          </div>
          <div class="flex-end">
              <p class="text-xs md:text-end text-BBDark">  <font-awesome-icon icon="calendar-days" class="text-gray-500 text-md cursor-pointer mr-1" />{{ date }}</p>
              <p :class="moneyClass"><b><font-awesome-icon icon="money-bill-transfer" class="text-xs cursor-pointer mr-1 pt-2" /></b>{{ value }}</p>
          </div>
      </div>
      <!-- ITEM -->
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'TransferItem',
  props: {
      name: {
          type: String,
          default: 'N/A'
      }, 
      method: {
          type: String,
          default: 'N/A'
      },
      type: {
          type: String,
          default: 'N/A'
      },
      date: {
          type: String,
          default: '00/00/1999'
      },
      value: {
          type: String,
          default: 'R$0.000,00'
      }
  },
  computed: {
      icon() {
          return this.type.toLowerCase() == 'received' ? 'circle-arrow-up' : 'circle-arrow-down';
      },
      moneyClass(){
          return this.type.toLowerCase() == 'received' ? "text-xs text-purple-400 text-center md:text-end" : "text-xs text-purple-700 text-center md:text-end"
      },
      typeClass(){
        return this.type.toLowerCase() == 'received' ? "md:absolute hidden md:block text-purple-700 text-3xl cursor-pointer pt-2" : "md:absolute hidden md:block text-purple-400 text-3xl cursor-pointer pt-2"
      }
  },
  components: {
      FontAwesomeIcon
  }
}
</script>