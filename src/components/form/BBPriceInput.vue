<template>
    <div class="relative">
      <input
        v-model="formattedValue"
        @input="updateValue"
        @blur="formatValue"
        class="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0,
      },
      placeholder: {
        type: String,
        default: "R$ 0,00",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        formattedValue: this.formatCurrency(this.value),
      };
    },
    methods: {
      formatCurrency(value) {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return formatter.format(value);
      },
      updateValue(event) {
        const rawValue = event.target.value
          .replace(/\D+/g, "")
          .replace(/^0+/, "");
        this.formattedValue = this.formatCurrency(rawValue / 100);
        this.$emit("input", rawValue / 100);
      },
      formatValue() {
        this.formattedValue = this.formatCurrency(this.value);
      },
    },
    watch: {
      value(newVal) {
        this.formattedValue = this.formatCurrency(newVal);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionais podem ser aplicados aqui */
  </style>
  