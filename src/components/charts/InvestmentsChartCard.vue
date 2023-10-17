<template>
    <div class="rounded-lg bg-white shadow-md p-6">
      <h2 class="text-xl font-semibold">{{ $t('banking.charts.title') }}</h2>
      <h1 class="text-gray-500 mb-2"  v-if="billStatistics?.greater"> <font-awesome-icon icon="arrow-up" class="text-md pr-1 text-red-500" /> <b>{{ $t(billStatistics?.difference || '0%') }} {{ $t('credit.charts.info.comparisson') }}</b>  {{ $t('credit.charts.info.description') }}</h1>
       <h1 class="text-gray-500 mb-2" v-else > <font-awesome-icon icon="arrow-down" class="text-md pr-1 text-green-500" /> <b>{{ $t(billStatistics?.difference || '0%') }} {{ $t('credit.charts.info.comparisson_two') }}</b>  {{ $t('credit.charts.info.description') }}</h1>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
  import Chart from 'chart.js/auto';
  import PWUtils from '@/utils/PWUtils';
  import BBMoney from '@/utils/BBMoney';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
  props: {
    cardTitle: String,
    bankingHistory: {
      type: Object,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const chartCanvas = ref(null);
    let barChart = null;
    let data = [0,0,0,0,0,0,0,0,0,0,0,0];

    /**
     * Calcs the difference between the current and last month bill
    */
    const billStatistics = computed(() => {
      let currentDate = PWUtils.getCurrentDate('credit');
      let lastMonthDate = PWUtils.getCurrentDate('credit-last');
      // Extract year and month from currentDate
      let currentDateYearMonth = currentDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
      let lastMonthYearMonth = lastMonthDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format

      let currentStatement = (props.bankingHistory?.find(item => item.timestamp == currentDateYearMonth))?.balance || 0
      let lastMonthStatement = (props.bankingHistory?.find(item => item.timestamp == lastMonthYearMonth))?.balance || 0;
      
      if (lastMonthStatement === 0) {
        return {
          greater: false,
          difference: 0
        }
      }
      let difference = Math.round(((currentStatement - lastMonthStatement) / lastMonthStatement) * 100);
      // Limit difference to a maximum of 200%
      difference = Math.min(difference, 200);
      if (currentStatement > lastMonthStatement) {
        return {
          greater: true,
          difference: difference == 200 ? "credit.charts.info.lot" : difference + "%"
        }
      }
      return {
        greater: false,
        difference: difference == 200 ? "credit.charts.info.lot" : difference + "%"
      }
    });


    const isCurrentMonth = (value, index) => {
      //check witch month is the current, using the number, then check if index i is equal to the current month
      let date = new Date();
      let month = date.getMonth();
      if (month == index) {
        return true;
      }
    };

    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      if(props?.bankingHistory){
         data = filterData(props.bankingHistory)
      }
      let monthLabel = getMonthLabels()
      barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: monthLabel,
            datasets: [
              {
                label: 'Bill',
                data: data,
                fill: true,
                backgroundColor: data.map((value, index) =>
                  isCurrentMonth(value, index) ? '#ca3167' : '#a855f7'
                ),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            borderRadius: 4,
            skipNull: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: function (context) {
                    const value = context.parsed.y;
                    if (value !== null) {
                      return `Saldo Final: R$${BBMoney.toCurrency(value)}`;
                    } else {
                      return "Saldo: R$0";
                    }
                  },
                  title: function (context) {
                    const date = context[0].parsed.x;
                    let monthName = new Date(0, date).toLocaleString(undefined, {
                      month: 'long',
                    });
                    monthName =
                      monthName.charAt(0).toUpperCase() + monthName.slice(1);
                    return `${monthName}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true, 
                suggestedMin: 0, 
                suggestedMax: 1000, 
              },
            },
          },
        });
    });
    onBeforeUnmount(() => {
      if (barChart) {
        barChart.destroy();
      }
    });
    //create a method
    function filterData(historyBanking) {
      const filteredData = Array(12).fill(0);
      historyBanking.forEach((item) => {
        const month = parseInt(item.timestamp.slice(5, 7), 10);
        if (!isNaN(month) && month >= 1 && month <= 12) {
          filteredData[month - 1] = item.balance;
          if (item.balance < 1) {
            filteredData[month - 1] = 0;
          }
        }
      });
      return filteredData;
    }
    function getMonthLabels() {
      const date = new Date(0); // Use uma data de exemplo (por exemplo, janeiro)
      const monthLabels = [];

      for (let i = 0; i < 12; i++) {
        date.setMonth(i);
        let monthName = date.toLocaleDateString(undefined, { month: 'short' });
        //get the first 3 letters and capitalize just the first letter
        monthName = monthName.slice(0, 3).charAt(0).toUpperCase() + monthName.slice(0, 3).slice(1);
        monthLabels.push(monthName);
      }

      return monthLabels;
    }


    // Watcher para atualizar os dados do gráfico quando statements mudar
    watch(() => props.bankingHistory, (banking) => {
     // console.log('statements changed', banking);
      if (barChart) {
        //for each month, from 01 to 12 get the corresponding "amount" value, if doesn't exist, set to 0
        barChart.data.datasets[0].data = filterData(banking); 
        barChart.update();
      }
    }, { deep: true });

    return {
      chartCanvas,
      billStatistics: billStatistics,
    };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para o card */
  </style>
  