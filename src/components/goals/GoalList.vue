<template>
  <div class="goal-list">
    <h3 class="goal-list__title">Select one of these categories:</h3>
    <div class="goal-list__wrapper">
      <div v-for="goal in goalList"
           :key="goal"
           :class="['goal-list__item', { 'is-selected': goal === selectedGoal }]"
           @click="selectGoal(goal)">
        {{ goal }}
      </div>
    </div>
    <div v-show="selectedGoal" :class="['goal-list__details', {'is-visible': selectedGoal}]">
      <label for="goal-list-details" class="goal-list__details-label">
        Describe your exact goal in that area:
      </label>
      <textarea name="details"
                id="goal-list-details"
                cols="20"
                v-model="goalDescriptionDraft"
                rows="5"
                class="goal-list__details-input">
      </textarea>
      <button @click="setGoal(goalDescriptionDraft)"
              :disabled="isDisabled"
              class="goal-list__details-button">
        Make this my goal
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'GoalList.vue',
  props: {
    countdownCompleted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      goalDescriptionDraft: null,
    };
  },
  mounted() {
    this.setGoalDescriptionDraft(this.goalDescription);
  },
  methods: {
    ...mapMutations('habits', ['setGoalDescription', 'setSelectedGoal']),
    setGoalDescriptionDraft(value) {
      this.goalDescriptionDraft = value;
    },
    selectGoal(value) {
      if (value !== this.selectedGoal) {
        this.setSelectedGoal(value);
        this.setGoalDescriptionDraft(null);
        this.setGoalDescription(null);
      }
    },
    setGoal(value) {
      this.setGoalDescription(value);
      this.$emit('resetCountdown');
      if (value) {
        this.$emit('showModal');
      }
    },
  },
  computed: {
    ...mapState('habits', ['selectedGoal', 'goalDescription', 'goalList']),
    isDisabled() {
      return !this.goalDescriptionDraft || this.goalDescriptionDraft === this.goalDescription;
    },
  },
  watch: {
    countdownCompleted(newValue) {
      if (newValue) {
        this.setGoal(this.goalDescriptionDraft);
      }
    },
    goalDescriptionDraft(newValue, oldValue) {
      if ((!newValue && oldValue) && this.goalDescription) {
        this.setGoalDescription(null);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../../style/base';
  @import '../../style/colors';
  @import '../../style/media-selectors';

  .goal-list {
    margin: 20px 0;

    &__wrapper {
      display: flex;
      flex-flow: row wrap;
    }

    &__item {
      border: 1px solid $color-black;
      border-radius: 8px;
      cursor: pointer;
      margin: 5px;
      padding: 10px;

      &:hover {
        background-color: $color-off-white;
      }

      &.is-selected {
        background-color: $color-rouge;
      }
    }

    &__details {
      height: auto;
      max-height: 0;
      transition: max-height 0.5s ease-in-out;

      &.is-visible {
        margin: 30px 0;
        max-height: 254px;
        transition: max-height 0.5s ease-in-out;
      }

      &-label {
        display: block;
        font-weight: 700;
        margin: 0 0 6px;
      }

      &-input {
        box-sizing: border-box;
        display: block;
        padding: 10px;
        width: 100%;
      }

      &-button {
        @include button-option($color-rouge, 10px);
        margin: 10px 0;
      }
    }

    @media #{$mobile} {
      margin: 6px 0;

      &__title {
        margin: 6px 0;
      }

      &__list {
        margin: 6px 0;
      }
    }
  }
</style>
