<template>
  <div class="brainstorm">
    <h2 class="brainstorm__title">Swarm of behaviours</h2>
    <span class="brainstorm__description">
      Let's think of things you can do to achieve your goal. You don't have to be realistic,
      the point is to think freely and collect many specific behaviours.
    </span>

    <GoalSummary class="brainstorm__goal"></GoalSummary>

    <span class="brainstorm__description">
      To start collecting ideas, click on the <strong>"start brainstorming"</strong> button below.
    </span>
    <span class="brainstorm__description">
      You can write on the post-it notes, and add new ones with the "Add note" button.
      If you are ready before the 5 minute countdown is finished,
      click on the <strong>"next"</strong> button below the post-it notes.
    </span>

    <button v-if="isTimerButtonVisible"
            @click="setCountdownStarted(true)"
            class="brainstorm__timer-button">
      start brainstorming
    </button>

    <Countdown v-if="isTimerVisible"
               :countdown-minutes="5"
               @handleCountdownFinish="handleCountdownFinish">
    </Countdown>

    <Notes v-if="countdownStarted"
           class="brainstorm__notes"
           :colour-types="noteColourTypes"
           :empty-note-placeholder="notePlaceholder"
           :should-be-draggable="false"
           :should-be-editable="true"
           @addNewNote="addNote"
           @deleteNote="deleteBrainstormNote"
           @editNote="editBrainstormNote"
           @setUnsaved="setBrainstormNoteUnsavedChanges"
           :notes-config="brainstormNotes">
    </Notes>

    <span v-if="unsavedChanges" class="brainstorm__notes-unsaved">
      There are notes with unsaved changes. Please save them before you move to the next screen!
    </span>

    <button v-if="isTimerVisible"
            @click="moveToNextScreen"
            :disabled="unsavedChanges"
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
import brainstormNote from '../../store/schemas/brainstormNote';
import Countdown from '../Countdown.vue';
import GoalSummary from '../goals/GoalSummary.vue';
import Modal from '../Modal.vue';
import Notes from '../notes/Notes.vue';

export default {
  name: 'BrainstormScreen.vue',
  components: {
    Countdown,
    GoalSummary,
    Modal,
    Notes,
  },
  data() {
    return {
      countdownStarted: false,
      countdownCompleted: false,
      notePlaceholder: '...',
      isEmptyModalVisible: false,
    };
  },
  methods: {
    ...mapMutations('habits', [
      'addBrainstormNote',
      'deleteBrainstormNote',
      'editBrainstormNote',
      'removePlaceholderBrainstormNotes',
      'setBrainstormNotes',
      'setBrainstormNoteUnsavedChanges',
    ]),
    ...mapMutations('navigation', ['setCurrentScreen']),
    addNote() {
      const randomIndex = Math.floor(Math.random() * 3);
      const newNote = { ...brainstormNote };
      newNote.content = this.notePlaceholder;
      newNote.id = this.brainstormNotes.length;
      newNote.type = this.noteColourTypes[randomIndex];
      this.addBrainstormNote(newNote);
    },
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
    ...mapState('habits', [
      'brainstormNotes',
      'brainstormNoteUnsavedChanges',
      'goalDescription',
      'noteColourTypes',
      'selectedGoal',
    ]),
    isTimerButtonVisible() {
      return !this.countdownStarted;
    },
    isTimerVisible() {
      return this.countdownStarted && !this.countdownCompleted;
    },
    unsavedChanges() {
      return this.brainstormNoteUnsavedChanges !== 0;
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

      &-unsaved {
        display: block;
        font-size: 11px;
        margin: 0 auto;
        max-width: 300px;
        text-align: center;
      }
    }

    &__timer-button {
      @include button-option();
      display: block;
    }

    &__next-button {
      @include button-option($color-rouge);
      display: block;
      margin: 20px auto 0;
      width: 200px;
    }
  }
</style>
