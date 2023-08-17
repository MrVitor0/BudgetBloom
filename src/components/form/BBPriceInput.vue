<template>
    <input
      v-model="formattedValue"
      @input="updateValue"
      @blur="formatValue"
      class="border w-full px-4 py-2 focus:border-purple-500 pr-2 focus:outline-none transition duration-300 ease-in-out"
      :placeholder="placeholder"
      :id="inputId"
      :disabled="disabled"
    />
</template>

<script>
import BBMoney from '@/utils/BBMoney'
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
      default: "0,00",
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
      formattedValue: BBMoney.toCurrency(this.value),
    };
  },
  watch: {
    value(newVal) {
      this.formattedValue = newVal;
    },
  },
  methods: {
    updateValue(event) {
      const rawValue = event.target.value.replace(/\D+/g, "");
      this.formattedValue = BBMoney.toCurrency(rawValue);
    },
    formatValue() {
      if (this.formattedValue) {
        const rawValue = parseFloat(this.formattedValue.replace(/\D+/g, "")) || 0;
        this.formattedValue = BBMoney.toCurrency(rawValue);
      } else {
        this.formattedValue = BBMoney.toCurrency(0);
      }
    },
  },
};
</script>
