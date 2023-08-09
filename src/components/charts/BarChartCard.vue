<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
export default {
  props: {
    cardTitle: String,
  },
  setup() {
    const chartCanvas = ref(null);
    let stockChart;

    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      stockChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Fixed Income', 'Stock Market', 'FIIS'],
          datasets: [
            {
              label: 'Investments',
              data: [2000, 9500, 5300],
              backgroundColor: ['#a855f7', '#17a2b8', '#28a745', '#ffc107'],
              borderColor: 'white',
              borderWidth: 1,
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
                  const value = context.raw;
                  return 'R$ ' + value.toLocaleString('pt-BR'); // Format number as currency
                },
              },
            },
          },
          elements: {
            bar: {
              borderRadius: 20, // Valor de raio para as bordas arredondadas
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
/* Card-specific styles */
</style>
