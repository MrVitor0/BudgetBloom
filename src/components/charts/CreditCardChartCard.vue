<template>
    <div class="rounded-lg bg-white shadow-md p-6">
      <h2 class="text-xl font-semibold">{{ $t('credit.charts.title') }}</h2>
      <h1 class="text-gray-500 mb-2"  v-if="billStatistics?.greater"> <font-awesome-icon icon="arrow-up" class="text-md pr-1 text-red-500" /> <b>{{ billStatistics?.difference }}% {{ $t('credit.charts.info.comparisson') }}</b>  {{ $t('credit.charts.info.description') }}</h1>
       <h1 class="text-gray-500 mb-2" v-else > <font-awesome-icon icon="arrow-down" class="text-md pr-1 text-green-500" /> <b>{{ billStatistics?.difference }}% {{ $t('credit.charts.info.comparisson_two') }}</b>  {{ $t('credit.charts.info.description') }}</h1>
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
    statements: {
      type: Object,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const chartCanvas = ref(null);
    let stockChart = null;
    let data = [0,0,0,0,0,0,0,0,0,0,0,0];

    /**
     * Calcs the difference between the current and last month bill
    */
    const billStatistics = computed(() => {
      let currentDate = PWUtils.getCurrentDate('credit');
      let lastMonthDate = PWUtils.getCurrentDate('credit-last');
      // Extract year and month from currentDate
      const currentDateYearMonth = currentDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
      const lastMonthYearMonth = lastMonthDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
      let currentStatement = (props.statements.find(item => item.reference.slice(0, 7) === currentDateYearMonth))?.amount || 0
      let lastMonthStatement = (props.statements.find(item => item.reference.slice(0, 7) === lastMonthYearMonth))?.amount || 0;
      if(currentStatement > lastMonthStatement){
        return {
          greater: true,
          difference: ((currentStatement - lastMonthStatement) / lastMonthStatement) * 100
        }
      }
      return {
        greater: false,
        difference: ((lastMonthStatement - currentStatement) / lastMonthStatement) * 100
      }
    });


    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      if(props?.statements){
         data = filterData(props.statements)
      }
      let monthLabel = getMonthLabels()
      stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: monthLabel,
          datasets: [
            {
              label: 'Bill',
              data: data, // Inicialmente vazio, será preenchido pelos dados de props.statements
              borderColor: '#a855f7',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const value = context.parsed.y;
                  return `Fatura: R$${BBMoney.toCurrency(value)}`;
                },
                title: function (context) {
                  const date = context[0].parsed.x;
                  //get the month name from the index
                  let monthName = new Date(0, date).toLocaleString(undefined, { month: 'long' });
                  monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
                  return `${monthName}`;
                },
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2,
              tension: 0.3,
              borderRadius: 10,
            },
            point: {
              radius: 3,
              hitRadius: 30,
            },
          },
        },
      });
    });
    onBeforeUnmount(() => {
      if (stockChart) {
        stockChart.destroy();
      }
    });
    //create a method
    function filterData(statement){
      let filteredData = []
      for (let i = 1; i <= 12; i++) {
        let month = i < 10 ? '0' + i : i
        let monthData = statement.find(item => item.reference.slice(5, 7) === month)
        if (monthData) {
          filteredData.push(monthData.amount)
        } else {
          filteredData.push(0)
        }
      }
      return filteredData
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
    watch(() => props.statements, (newStatements) => {
      if (stockChart) {
        //for each month, from 01 to 12 get the corresponding "amount" value, if doesn't exist, set to 0
        stockChart.data.datasets[0].data = filterData(newStatements); 
        stockChart.update();
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
  