<template>
  <div class="goal-summary">
    <div class="goal-summary__text-wrapper">
      <span class="goal-summary__text">Your selected area: </span>
      <span class="goal-summary__selected">{{ selectedGoal }}</span>
    </div>
    <div class="goal__summary-text-wrapper">
      <span class="goal-summary__text">Your goal: </span>
      <span class="goal-summary__description">{{ goalDescription }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GoalSummary.vue',
  computed: {
    ...mapState('habits', ['selectedGoal', 'goldenBehaviour', 'goalDescription']),
  },
};
</script>

<style scoped lang="scss">
  @import '../../style/colors';
  .goal-summary {
    padding: 10px 0;

    &__text-wrapper {
      display: block;
      line-height: 28px;
      margin: 10px 0;
    }

    &__selected {
      background-color: $color-rouge;
      border: 1px solid $color-black;
      border-radius: 8px;
      margin: 5px 0;
      padding: 5px 10px;
      white-space: nowrap;
    }

    &__description {
      display: inline-block;
      font-family: monospace;
      font-weight: 700;
      margin: 0 6px;
    }
  }
</style>
