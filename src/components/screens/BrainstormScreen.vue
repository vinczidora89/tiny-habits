<template>
  <div class="brainstorm">
    <h2 class="brainstorm__title">Swarm of behaviours</h2>
    <span class="brainstorm__description">
      Let's think of things you can do to achieve your goal. You don't have to be realistic,
      the point is to think freely and collect many specific behaviours.
    </span>

    <GoalSummary class="brainstorm__goal"></GoalSummary>

    <span class="brainstorm__description">
      To start collecting ideas, click on the "start brainstorming" button below.
      You can write on the post-it notes, and add new ones with the "Add note" button.
      If you are ready before the 5 minute countdown is finished,
      click on the "next" button below the post-it notes.
    </span>

    <button v-if="isTimerButtonVisible"
            @click="setCountdownStarted(true)"
            class="brainstorm__timer-button">
      start brainstorming
    </button>

    <Timer v-if="isTimerVisible"
           :countdown-completed="countdownCompleted"
           :countdown-minutes="5"
           :countdown-started="countdownStarted"
           @handleCountdownFinish="handleCountdownFinish"
           @setCountdownStarted="setCountdownStarted">
    </Timer>

    <Notes v-if="countdownStarted"
           class="brainstorm__notes"
           :colour-types="noteColourTypes"
           :empty-note-placeholder="notePlaceholder"
           :should-be-draggable="false"
           :should-be-editable="true"
           @addNewNote="addBrainstormNote"
           @deleteNote="deleteBrainstormNote"
           @editNote="editBrainstormNote"
           :notes-config="brainstormNotes">
    </Notes>

    <button v-if="isTimerVisible"
            @click="moveToNextScreen"
            class="brainstorm__next-button">
      next
    </button>

    <Modal v-show="isEmptyModalVisible"
           button-text-secondary="restart"
           @secondaryAction="restartCountdown"
           @close="closeEmptyModal">
      <template v-slot:header>
        <span class="modal__title">No Behaviour</span>
      </template>
      <template v-slot:body>
        <span class="modal-text">
          Your time is up and you haven't written behaviours yet. Would you like to restart?
        </span>
      </template>
    </Modal>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import GoalSummary from '../goals/GoalSummary.vue';
import Modal from '../Modal.vue';
import Notes from '../notes/Notes.vue';
import Timer from '../Timer.vue';

export default {
  name: 'BrainstormScreen.vue',
  components: {
    GoalSummary,
    Modal,
    Notes,
    Timer,
  },
  data() {
    return {
      countdownStarted: false,
      countdownCompleted: false,
      notePlaceholder: 'write a behaviour here',
      isEmptyModalVisible: false,
    };
  },
  methods: {
    ...mapMutations('habits', [
      'addBrainstormNote',
      'deleteBrainstormNote',
      'editBrainstormNote',
      'removePlaceholderBrainstormNotes',
    ]),
    ...mapMutations('navigation', ['setCurrentScreen']),
    setCountdownStarted(value) {
      this.countdownStarted = value;
    },
    setCountdownCompleted(value) {
      this.countdownCompleted = value;
    },
    handleCountdownFinish() {
      this.setCountdownCompleted(true);
      this.moveToNextScreen();
    },
    moveToNextScreen() {
      this.removePlaceholderBrainstormNotes(this.notePlaceholder);
      if (this.brainstormNotes.length > 0) {
        this.setCurrentScreen('MappingScreen');
      } else {
        this.showEmptyModal();
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
    closeEmptyModal() {
      this.isEmptyModalVisible = false;
    },
    showEmptyModal() {
      this.isEmptyModalVisible = true;
    },
  },
  computed: {
    ...mapState('habits', ['brainstormNotes', 'goalDescription', 'noteColourTypes', 'selectedGoal']),
    isTimerButtonVisible() {
      return !this.countdownStarted;
    },
    isTimerVisible() {
      return this.countdownStarted && !this.countdownCompleted;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../../style/base';
  @import '../../style/colors';

  .brainstorm {
    margin: 0 auto;
    max-width: 600px;
    min-height: 600px;
    width: 100%;

    &__title {
      @extend %title;
    }

    &__description {
      display: block;
      margin: 20px 0;
    }

    &__goal {
      background-color: $color-off-white;
      border-radius: 4px;
      margin: 20px 0 30px;
      padding: 10px 20px;
    }

    &__notes {
      min-height: 206px;
    }

    &__timer-button {
      @include button-option();
      display: block;
    }

    &__next-button {
      @include button-option($color-rouge);
      display: block;
      margin: 40px auto 0;
      width: 200px;
    }
  }
</style>
