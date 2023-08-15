<template>
    <div class="relative w-full">
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <font-awesome-icon :icon="icon" class="text-md text-purple-400" />
      </div>
      <input
        v-model="formattedValue"
        @input="updateValue"
        @blur="formatValue"
        class="block w-full pl-8 py-3 border rounded focus:outline-none focus:border-blue-500 bg-gray-200"
        :placeholder="placeholder"
        :id="inputId"
      />
    </div>
  </template>
  
  <script>
  // Importe o FontAwesomeIcon aqui, se ainda não o fez
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    props: {
      value: {
        type: Number,
        default: 0,
      },
      placeholder: {
        type: String,
        default: "0,00",
      },
      icon: {
        type: String,
        default: "dollar-sign",
      },
      inputId: {
        type: String,
        default: "currency-input",
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
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(value / 100);
      },
      updateValue(event) {
        const rawValue = event.target.value.replace(/\D+/g, "");
        this.formattedValue = this.formatCurrency(rawValue);
        this.$emit("input", parseFloat(rawValue));
      },
      formatValue() {
        if (this.formattedValue) {
          const rawValue = parseFloat(this.formattedValue.replace(/\D+/g, "")) || 0;
          this.formattedValue = this.formatCurrency(rawValue);
        } else {
          this.formattedValue = this.formatCurrency(0);
        }
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
  /* Adicione a classe personalizada para o ícone do FontAwesome */
  .dollar-icon {
    color: #8b5cf6; /* ou qualquer outra cor que você prefira */
  }
  
  /* Estilos adicionais podem ser aplicados aqui */
  </style>
  