<template>
    <div class="intro">
      <h1 class="intro__title">Tiny Habits</h1>
      <div class="intro__subtitle">
        What is this all about?
      </div>
      <span class="intro__description">
        Improving your life is much easier than you think.
        Whether it's losing weight, sleeping more, or restoring your work/life balance
        - the secret is to <strong>start small</strong>.
      </span>
      <span class="intro__description">
        The world expert on this is Silicon Valley legend
        <strong>BJ Fogg</strong>, pioneering research psychologist
        and  <strong>founder of the iconic Behaviour Design Lab</strong> at Stanford.
      </span>
      <span class="intro__description">
        Focus on what is <strong>easy to change</strong>, not what is hard;
        focus on what you want to do, not what you should do.
      </span>
      <BehaviourChart class="intro__behaviour-chart"></BehaviourChart>
      <button @click="setCurrentScreen('GoalScreen')"
              class="intro__button">
        Let's get started!
      </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BehaviourChart from '../charts/BehaviourChart.vue';

export default {
  name: 'IntroScreen',
  components: {
    BehaviourChart,
  },
  methods: {
    ...mapMutations('navigation', ['setCurrentScreen']),
  },
};
</script>

<style scoped lang="scss">
@import "../../style/base";
@import "../../style/colors";

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

  &__button {
    @include button-option();
    margin: 20px 0;
  }
}
</style>
