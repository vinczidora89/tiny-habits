<template>
  <div class="mapping">
    <h2 class="mapping__title">Map your behaviours</h2>

    <span class="mapping__description">
      Now you can place the behaviours you collected on this graph.
    </span>
    <span class="mapping__description">
      First work on the Y axis: if you feel like a behaviour would have a high impact
      in reaching your goal, place them higher,
      if not so much, place them near the bottom.
    </span>
    <span class="mapping__description">
      Then move on to the vertical X axis: if you feel like doing the thing written on
      the note takes a lot of skill and/or effort, move them closer to the right,
      if it's relatively easy to do, move them more to the left.
    </span>
    <span class="mapping__description">
      When you are ready, click on the "choose golden" button below
      to choose the one habit you will work on!
    </span>

    <div class="mapping__chart" ref="chart">
      <span class="mapping__chart-axis mapping__chart-axis--x"></span>
      <span class="mapping__chart-axis-label mapping__chart-axis--x-label">
        easy (not much motivation and/or ability)
      </span>
      <span class="mapping__chart-axis-label
      mapping__chart-axis--x-label
      mapping__chart-axis--x-label-low">
        hard (lots of motivation+ability)
      </span>
      <span class="mapping__chart-axis mapping__chart-axis--y"></span>
      <span class="mapping__chart-axis-label mapping__chart-axis--y-label">
        high impact
      </span>
      <span class="mapping__chart-axis-label
      mapping__chart-axis--y-label
      mapping__chart-axis--y-label-low">
        low impact
      </span>
      <Notes :bounding-box="boundingBox"
             :colour-types="noteColourTypes"
             note-size="small"
             :should-be-draggable="true"
             :should-be-editable="false"
             :show-add-button="false"
             :notes-config="brainstormNotes"
             @setNotePosition="setBrainstormNotePosition">
      </Notes>
    </div>

    <button @click="setGoldenBehaviour"
            class="mapping__golden-button">
      choose golden
    </button>

    <Modal v-if="goldenBehaviour"
           v-show="isGoldenModalVisible"
           button-text-primary="move on"
           button-text-secondary="change"
           @primaryAction="setCurrentScreen('DashboardScreen')"
           @secondaryAction="closeGoldenModal"
           @close="closeGoldenModal">
      <template v-slot:header>
        <span class="mapping__modal-title">Golden Behaviour</span>
      </template>
      <template v-slot:body>
        <div class="mapping__modal-body">
          <span class="mapping__modal-text">
            Your golden behaviour is:
          </span>
          <GoldenBehaviourNote></GoldenBehaviourNote>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import GoldenBehaviourNote from '../notes/GoldenBehaviourNote.vue';
import Modal from '../Modal.vue';
import Notes from '../notes/Notes.vue';

export default {
  name: 'MappingScreen.vue',
  components: {
    GoldenBehaviourNote,
    Modal,
    Notes,
  },
  mounted() {
    this.boundingBox = this.$refs.chart;
  },
  data() {
    return {
      boundingBox: undefined,
      isGoldenModalVisible: false,
    };
  },
  methods: {
    ...mapActions('habits', ['chooseGolden']),
    ...mapMutations('habits', ['setBrainstormNotePosition']),
    ...mapMutations('navigation', ['setCurrentScreen']),
    setGoldenBehaviour() {
      this.chooseGolden();
      this.showGoldenModal();
    },
    closeGoldenModal() {
      this.isGoldenModalVisible = false;
    },
    showGoldenModal() {
      this.isGoldenModalVisible = true;
    },
  },
  computed: {
    ...mapState('habits', ['brainstormNotes', 'goldenBehaviour', 'noteColourTypes']),
  },
};
</script>

<style scoped lang="scss">
@import './../../style/base';
@import './../../style/colors';
@import './../../style/media-selectors';

  .mapping {
    margin: 0 auto;
    max-width: 600px;
    width: 100%;

    &__title {
      @extend %title;
    }

    &__description {
      display: block;
      font-size: 12px;
      margin: 12px 0;
    }

    &__chart {
      background-color: lighten($color-latte, 30%);
      height: 500px;
      margin: 20px auto;
      position: relative;
      width: 500px;

      &-axis {
        background-color: darken($color-latte, 10%);
        display: block;
        height: 1px;
        left: 5px;
        position: absolute;
        top: calc(50% - 1px);
        width: calc(100% - 10px);

        &:after {
          background: url('../../assets/icons/chevron-left.svg');
          background-size: 19px 19px;
          content: '';
          display: block;
          height: 19px;
          left: calc(100% - 10px);
          position: relative;
          top: -9px;
          width: 19px;
        }

        &-label {
          display: block;
          font-size: 12px;
          left: 265px;
          position: absolute;
          top: calc(50% + 1px);
          text-align: center;
          width: 230px;
        }

        &--x-label-low {
          left: 20px;
          top: calc(50% + 1px);
        }

        &--y,
        &--y-label {
          transform: rotate(270deg);
        }

        &--y-label {
          left: 145px;
          top: calc(50% - 98px);

          &-low {
            left: 145px;
            top: calc(50% - -67px);
          }
        }
      }
    }

    &__golden-button {
      @include button-option($color-rouge);
      display: block;
      margin: 40px auto 0;
      width: 200px;
    }

    &__modal {
      &-title {
        display: block;
        text-align: center;
      }

      &-body {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
      }

      &-text {
        flex: 0 0 100%;
        text-align: center;
      }
    }

    @media #{$mobile} {
      &__chart {
        height: 100vw;
        width: 100%;

        &-axis {
          &-label {
            left: calc(100% - 161px);
            width: 160px;
          }

          &--x-label-low {
            left: -20px;
          }

          &--y-label {
            left: calc(100% - 255px);
          }
        }
      }
    }
  }

</style>
