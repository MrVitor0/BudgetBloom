<template>
   <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Current Money" amount="R$0.000,00" icon="money-bill" color="green" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Passive Incoming" amount="R$0.000,00" percentage="+20%" icon="money-bill" color="red" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="CDB Applications" amount="R$0.000,00" percentage="+20%"  icon="money-bill" color="blue" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Stock Apllications" amount="R$0.000,00" percentage="+20%"  icon="money-bill"  />
      </div>
     
    </div>
</template>

<script>
import PriceCard from '@/components/common/PriceCard.vue';
export default {
  name: 'DashboardHome',
  components: {
    PriceCard
  },
  // ... Outras configurações
}
</script>

<style scoped>
.bg-gradient-to-tr {
  background: linear-gradient(to top right, var(--tw-gradient-stops));
}
</style>
