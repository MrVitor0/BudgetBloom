<template>
  <div class="rounded-3xl bg-white shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">Profits Overview</h2>
    <h1 class="text-gray-500 mb-2"> 
      <font-awesome-icon icon="arrow-up" class="text-md pr-1 text-green-500" /> <b>7% more</b> in 2023</h1>
      
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  props: {
    cardTitle: String,
  },
  components: {
    FontAwesomeIcon
  },
  setup() {
    const chartCanvas = ref(null);
    let stockChart;

    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Ações',
              data: Array.from({ length: 12 }, () => Math.random() * (100 - 80) + 80),
              borderColor: '#a855f7',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true, // Oculta a legenda
            },
            tooltip: {
              enabled: true, // Desativa as tooltips
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

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para o card */
</style>
