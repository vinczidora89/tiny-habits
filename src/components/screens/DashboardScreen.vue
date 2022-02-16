<template>
    <div class="dashboard">
      <h2 class="dashboard__title">
        Dashboard
      </h2>
      <span class="dashboard__description">
        Here you can find the summary of the goal and the habit you chose.
      </span>
      <GoalSummary class="dashboard__goal"></GoalSummary>
      <span class="dashboard__tiny-habit-label">Your Tiny Habit:</span>
      <Note :content="goldenBehaviour.content"
            empty-note-placeholder="..."
            :id="0"
            :should-be-draggable="false"
            :should-be-editable="false"
            :should-be-deletable="false"
            :type="goldenBehaviour.type"
            class="dashboard__tiny-habit-note">
      </Note>
      <div class="dashboard__progress">
        <span class="dashboard__progress-label">
          Track your progress here:
        </span>
        <span v-for="index in 20"
              :key="index"
              :class="['dashboard__progress-item', {'is-checked': isCircleChecked(index) }]"
              @click="toggleCircle(index)">
          {{ index }}
        </span>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GoalSummary from '../goals/GoalSummary.vue';
import Note from '../notes/Note.vue';

export default {
  name: 'DashboardScreen',
  components: {
    GoalSummary,
    Note,
  },
  data() {
    return {
      checkedCircles: [],
    };
  },
  computed: {
    ...mapState('habits', ['selectedGoal', 'goalDescription', 'goldenBehaviour']),
  },
  methods: {
    toggleCircle(index) {
      return this.isCircleChecked(index)
        ? this.checkedCircles.splice(this.checkedCircles.indexOf(index), 1)
        : this.checkedCircles.push(index);
    },
    isCircleChecked(index) {
      return this.checkedCircles.indexOf(index) > -1;
    },
  },
};
</script>

<style scoped lang="scss">
@import './../../style/base';
@import './../../style/colors';
@import './../../style/media-selectors';

.dashboard {
  margin: 0 auto;
  max-width: 600px;
  min-height: 600px;
  width: 100%;

  &__title {
    @extend %title;
  }

  &__description {
    display: block;
    text-align: center;
  }

  &__goal {
    background-color: $color-off-white;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 20px auto 30px;
    max-width: 400px;
    padding: 10px 20px;
    width: 100%;
  }

  &__tiny-habit {
    &-note {
      margin: 0 auto;
    }

    &-label {
      display: block;
      font-weight: 700;
      margin: 20px auto;
      width: 150px;
    }
  }

  &__progress {
    display: flex;
    flex-flow: row wrap;
    margin: 20px auto 0;
    width: 150px;

    &-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      margin: 0 0 6px;
    }

    &-item {
      align-items: center;
      border: 2px solid $color-honey;
      border-radius: 50px;
      color: $color-honey;
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin: 0 0 5px 5px;
      height: 20px;
      width: 20px;

      &.is-checked {
        background-color: $color-honey;
      }
    }
  }
}

</style>
