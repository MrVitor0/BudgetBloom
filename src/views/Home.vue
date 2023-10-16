<template>
   <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-2/4  px-4 mb-5">
        <price-card title="Saldo da Conta" :amount="transactions.account_balance" icon="bank" color="green" />
      </div>
      <div class="w-full md:w-1/4  px-4 mb-5">
        <price-card title="Recebimentos Mensais" :amount="transactions.current_incoming"  icon="sack-dollar" color="blue" />
      </div>
      <div class="w-full md:w-1/4  px-4 mb-5">
        <price-card title="Gastos Mensais" :amount="transactions.current_expenses"  icon="piggy-bank" color="red" />
      </div>
    </div>
      <!-- Graphics cards -->
      <div class="flex flex-wrap -mx-4 ">
        <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-5 ">
          <InvestmentsChartCard :statements="statements" class="h-full"/>
        </div>
      <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-5">
        <CreditCardChartCard :statements="statements" class="h-full" />
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
  
</template>

<script>
import PriceCard from '@/components/cards/PriceCard.vue';
import InvestmentsChartCard from '@/components/charts/InvestmentsChartCard.vue';
import InfoCard from '@/components/cards/InfoCard.vue';
import CreditCardChartCard from '@/components/charts/CreditCardChartCard.vue';
export default {
  name: 'DashboardHome',
  components: {
    PriceCard,
    InfoCard,
    InvestmentsChartCard,
    CreditCardChartCard
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


      transactions: {
        account_balance: 0,
        current_incoming: 0,
        current_expenses: 0,
        transactions: []
      },
      statements: []
    };
  },
  async mounted() {
        const transactions = await this.$api.get("/api/banking/user/transaction/list")
        const creditcard = await this.$api.get("/api/credit/user/bill/list")
        this.statements = creditcard?.data || []
        this.transactions = transactions?.data || []
  },
}
</script>

<style scoped>
.bg-gradient-to-tr {
  background: linear-gradient(to top right, var(--tw-gradient-stops));
}
</style>
