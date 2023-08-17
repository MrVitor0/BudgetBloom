<template>
   <select
        v-if="type === 'Month'"
        v-model="selectedMonth"
        class="block pl-8 appearance-none py-3 border cursor-pointer focus:outline-none focus:border-purple-500 w-full"
      >
        <option v-for="(month, index) in months" :key="month" :value="index + 1">{{ month }}</option>
    </select>
    <select
        v-else-if="type === 'Year'"
        v-model="selectedYear"
        class="block pl-1 py-3 border w-full cursor-pointer focus:outline-none focus:border-purple-500"
      >
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
  </template>
  

  <script>
  export default {
    props: {
      type: {
        type: String,
        default: "Month"
      }
    },
    data() {
      return {
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth() + 1,
        years: [],
        months: [
          "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
      };
    },
    computed: {
      minYear() {
        return Math.min(...this.years);
      },
      maxYear() {
        return Math.max(...this.years);
      }
    },
    watch: {
      selectedYear(newYear) {
        if (newYear < this.minYear) {
          this.selectedYear = this.minYear;
        } else if (newYear > this.maxYear) {
          this.selectedYear = this.maxYear;
        }
      }
    },
    methods: {
      updateYearRange() {
        const currentYear = new Date().getFullYear();
        this.years = [currentYear - 5, currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
      }
    },
    created() {
      this.updateYearRange();
    }
  };
  </script>
