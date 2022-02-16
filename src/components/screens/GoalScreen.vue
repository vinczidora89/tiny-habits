<template>
  <div class="goal">
    <h2 class="goal__title">Set a goal</h2>
    <p class="goal__description">
      <span class="goal__description-item">
        You will need to set a goal that you feel motivated by.
        You will have 5 minutes to find one goal that you can work with
        - first you choose the topic, then fine-tune your goal.
      </span>
      <span class="goal__description-item">
        If you feel like you're ready to get started, click on the button below.
        You will see a list of topics, and once you choose what you want to work on,
        you can write your goal in the text input below the topics.
      </span>
    </p>

    <button v-if="isTimerButtonVisible"
            @click="setCountdownStarted(true)"
            class="goal__timer-button">
      start setting a goal
    </button>

    <Timer v-if="isTimerVisible"
           :countdown-completed="countdownCompleted"
           :countdown-minutes="5"
           :countdown-started="countdownStarted"
           @handleCountdownFinish="handleCountdownFinish"
           @setCountdownStarted="setCountdownStarted">
    </Timer>

    <GoalList v-if="countdownStarted"
              :countdown-completed="countdownCompleted"
              @showModal="showConfirmModal"
              @resetCountdown="resetCountdown">
    </GoalList>

    <Modal v-show="isConfirmModalVisible"
           button-text-primary="move on"
           button-text-secondary="modify goal"
           @primaryAction="submitGoal"
           @secondaryAction="restartCountdown"
           @close="closeConfirmModal">
      <template v-slot:header>
        <span class="modal__title">Your Goal</span>
      </template>
      <template v-slot:body>
        <GoalSummary class="modal__goals"></GoalSummary>
        <span class="modal-text">Are you ready to move on?</span>
      </template>
    </Modal>

    <Modal v-show="isMissingGoalModalVisible"
           button-text-secondary="restart"
           @secondaryAction="restartCountdown"
           @close="closeMissingGoalModal">
      <template v-slot:header>
        <span class="modal__title">Missing Goal</span>
      </template>
      <template v-slot:body>
        <span class="modal-text">
          Your time is up and you haven't written a goal yet. Would you like to restart?
        </span>
      </template>
    </Modal>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import GoalList from '../goals/GoalList.vue';
import GoalSummary from '../goals/GoalSummary.vue';
import Modal from '../Modal.vue';
import Timer from '../Timer.vue';

export default {
  name: 'GoalScreen.vue',
  components: {
    GoalList,
    GoalSummary,
    Modal,
    Timer,
  },
  data() {
    return {
      countdownStarted: false,
      countdownCompleted: false,
      isConfirmModalVisible: false,
      isMissingGoalModalVisible: false,
    };
  },
  methods: {
    ...mapActions('habits', ['saveGoal']),
    ...mapMutations('habits', ['setSelectedGoal']),
    setCountdownStarted(value) {
      this.countdownStarted = value;
    },
    setCountdownCompleted(value) {
      this.countdownCompleted = value;
    },
    submitGoal() {
      this.saveGoal({ goal: this.selectedGoal, goalDescription: this.goalDescription });
    },
    handleCountdownFinish() {
      this.setCountdownCompleted(true);
      if (this.goalDescription) {
        this.showConfirmModal();
      } else {
        this.showMissingGoalModal();
      }
    },
    resetCountdown() {
      this.setCountdownStarted(false);
      this.setCountdownCompleted(false);
    },
    restartCountdown() {
      this.setCountdownStarted(true);
      this.setCountdownCompleted(false);
    },
    closeConfirmModal() {
      this.isConfirmModalVisible = false;
    },
    showConfirmModal() {
      this.isConfirmModalVisible = true;
    },
    closeMissingGoalModal() {
      this.isMissingGoalModalVisible = false;
    },
    showMissingGoalModal() {
      this.isMissingGoalModalVisible = true;
    },
  },
  computed: {
    ...mapState('habits', ['goalDescription', 'selectedGoal']),
    isTimerButtonVisible() {
      return !(this.isConfirmModalVisible
        || this.isMissingGoalModalVisible) && !this.countdownStarted;
    },
    isTimerVisible() {
      return !(this.isConfirmModalVisible
        || this.isMissingGoalModalVisible) && this.countdownStarted;
    },
  },
};
</script>

<style scoped lang="scss">
@import './../../style/base';
@import './../../style/colors';
@import './../../style/media-selectors';

  .goal {
    align-items: flex-start;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    margin: 0 auto;
    max-width: 600px;
    min-height: 600px;
    width: 100%;

    &__title {
      @extend %title;
    }

    &__description {
      &-item {
        display: block;
        margin: 10px 0;
      }
    }

    &__timer-button {
      @include button-option();
      display: block;
      margin: 20px auto;
    }
  }

  .modal {
    &__goals {
      border-bottom: 1px solid $color-black;
      margin: 0 0 20px;
      padding: 0 0 10px;
    }
  }

  @media #{$mobile} {
    .goal {
      &__description {
        margin: 12px 0;

        &-item {
          margin: 6px 0;
        }
      }
    }
  }

</style>
