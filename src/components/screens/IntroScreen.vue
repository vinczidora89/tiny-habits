<template>
    <div class="intro">
      <h1 class="intro__title">Tiny Habits</h1>
      <div class="intro__subtitle">
        What is this all about?
      </div>
      <span class="intro__description">
        Improving your life is much easier than you think.
        Whether it's losing weight, sleeping more, or restoring your work/life balance
        - the secret is to start small.
      </span>
      <span class="intro__description">
        The world expert on this is Silicon Valley legend BJ Fogg, pioneering research psychologist
        and founder of the iconic Behaviour Design Lab at Stanford.
      </span>
      <span class="intro__description">
        Focus on what is easy to change, not what is hard;
        focus on what you want to do, not what you should do.
      </span>
      <div class="intro__chart-wrapper">
        <line-chart :chart-data="chartData" :chart-options="chartOptions"/>
      </div>
      <button @click="setCurrentScreen('GoalScreen')"
              class="intro__button">
        Let's get started!
      </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import LineChart from '../Chart.vue';

export default {
  name: 'IntroScreen',
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
  methods: {
    ...mapMutations('navigation', ['setCurrentScreen']),
  },
};
</script>

<style scoped lang="scss">
@import "../../style/base";
@import "../../style/colors";
@import "../../style/media-selectors";

.intro {
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
  width: 100%;

  &__title {
    @extend %title;
  }

  &__subtitle {
    font-weight: 700;
    text-align: left;
  }

  &__description {
    display: block;
    font-size: 12px;
    line-height: 1.2;
    margin: 12px 0;
    text-align: left;
  }

  &__chart {
    &-wrapper {
      height: 300px;
      margin: 0 auto;
      max-width: 300px;
      width: 100%;
    }
  }

  &__button {
    @include button-option();
    margin: 20px 0;
  }

  @media #{$mobile} {
    &__chart {
      &-wrapper {
        height: auto;
      }
    }
  }
}
</style>
