<template>
   <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Current Balance" :amount="balance" icon="bank" color="green" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Investment Portfolio" :amount="investmentBalance"  icon="piggy-bank" color="blue" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Month Earnings" :amount="monthEarnings"  icon="sack-dollar" color="red" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-5">
        <price-card title="Stock Apllications" amount="R$0.000,00" percentage="20"  icon="money-bill"  />
      </div>
    </div>
    <!-- Info cards -->
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-2/3 px-4 mb-5">
        <InfoCard
          heading="Built by developers"
          subheading="PurpleWallet"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore."
          linkText="View More"
          icon="arrow-right"
          imageSrc="@/assets/rocket-white.png"
        />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
        <InfoCard
          heading="Built by developers"
          subheading="PurpleWallet"
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
        <div class="rounded-3xl bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Your Investments</h2>
          <h1 class="text-gray-500 mb-2 items-center"> 
            <font-awesome-icon icon="arrow-up" class="text-md pr-1 text-green-500" /> <b>7% more</b> in 2023</h1>
            <div class="">
                    <BarChartCard />
            </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-5">
        <StockChartCard cardTitle="CDB Overview" />
      </div>
    </div>
</template>

<script>
import PriceCard from '@/components/cards/PriceCard.vue';
import BarChartCard from '@/components/charts/BarChartCard.vue';
import InfoCard from '@/components/cards/InfoCard.vue';
import StockChartCard from '@/components/charts/StockChartCard.vue';
export default {
  name: 'DashboardHome',
  components: {
    PriceCard,
    InfoCard,
    BarChartCard,
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
      },


      balance:0,
      monthEarnings: 0,
      investmentBalance: 0,

    };
  },
  async mounted() {
        const response = await this.$api.get("/banking")
        const investmentResponse = await this.$api.get("/investwallet")
        if(response.data){
          let data = response.data
          this.balance = data.account_balance
          this.monthEarnings = data.current_incoming
        }
        if(investmentResponse.data){
          let data = investmentResponse.data[0]
          console.log(data)
          this.investmentBalance = data.investmentbalance?.value
        }
          
  },
}
</script>

<style scoped>
.bg-gradient-to-tr {
  background: linear-gradient(to top right, var(--tw-gradient-stops));
}
</style>
