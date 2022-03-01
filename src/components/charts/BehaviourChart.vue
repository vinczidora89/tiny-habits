<template>
  <div class="behaviour-chart">
    <line-chart :chart-data="chartData" :chart-options="chartOptions"/>
  </div>
</template>

<script>
import LineChart from './BaseChart.vue';

export default {
  name: 'BehaviourChart',
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
          {
            label: 'Actually doing a behaviour',
            data: [10, 6.66, 4.44, 2.96, 1.97, 1.32, 0.88, 0.58, 0.39, 0.26],
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      chartOptions: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'necessary motivation level',
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'required ability',
            },
            ticks: {
              beginAtZero: false,
              display: false,
            },
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
};
</script>

<style scoped lang="scss">
  @import "../../style/media-selectors";

  .behaviour-chart {
    height: 300px;
    margin: 0 auto;
    max-width: 300px;
    width: 100%;

    @media #{$mobile} {
      height: auto;
    }
  }
</style>
