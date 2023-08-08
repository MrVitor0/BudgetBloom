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
    <!-- Info cards -->
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-2/3 px-4 mb-5">
        <InfoCard
          heading="Built by developers"
          subheading="BudgetBloom"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore."
          linkText="View More"
          icon="arrow-right"
          imageSrc="@/assets/rocket-white.png"
        />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
        <InfoCard
          heading="Built by developers"
          subheading="BudgetBloom"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore."
          linkText="View More"
          icon="arrow-right"
          imageSrc="@/assets/rocket-white.png"
        />
      </div>
    </div>
    <!-- Graphics cards -->
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-5">
        <StockChartCard cardTitle="2023 Overview" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-5">
        <StockChartCard cardTitle="CDB Overview" />
      </div>
    </div>
</template>

<script>
import PriceCard from '@/components/cards/PriceCard.vue';
import InfoCard from '@/components/cards/InfoCard.vue';
import StockChartCard from '@/components/charts/StockChartCard.vue';
export default {
  name: 'DashboardHome',
  components: {
    PriceCard,
    InfoCard,
    StockChartCard
  },
  data() {
    return {
      chartData: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          data: [30, 45, 25],
          backgroundColor: ['#7E57C2', '#FF7043', '#4DB6AC'],
        }],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // Outras configurações do gráfico
      },
    };
  },
  // ... Outras configurações
}
</script>

<style scoped>
.bg-gradient-to-tr {
  background: linear-gradient(to top right, var(--tw-gradient-stops));
}
</style>
