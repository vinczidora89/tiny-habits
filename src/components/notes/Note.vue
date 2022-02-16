<template>
    <div v-draggable="draggableValue"
         :class="['note__item', noteSize, type]"
         v-if="this.shouldBeDraggable">
      <span v-if="shouldBeDeletable"
            @click="this.$emit('deleteNote', this.id)"
            class="note__delete">
      </span>
      <span class="note__content"
            :contenteditable="this.shouldBeEditable"
            @keyup="updateText">
        {{ content }}
      </span>
    </div>

    <div v-else :class="['note__item', noteSize, type]">
      <span v-if="shouldBeDeletable"
            @click="$emit('deleteNote', id)"
            class="note__delete">
      </span>
      <span class="note__content"
            ref="note"
            :contenteditable="this.shouldBeEditable">
        {{ content }}
      </span>
      <span v-if="shouldBeEditable"
            @click="updateText"
            class="note__save">
        Save changes
      </span>
    </div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive';

export default {
  directives: {
    Draggable,
  },
  name: 'Note.vue',
  props: {
    boundingBox: {
      type: HTMLElement,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    emptyNotePlaceholder: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    noteSize: {
      type: String,
      required: false,
    },
    shouldBeDraggable: {
      type: Boolean,
      default: false,
    },
    shouldBeDeletable: {
      type: Boolean,
      default: true,
    },
    shouldBeEditable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'yellow',
    },
  },
  data() {
    return {
      draggableValue: {
        boundingElement: undefined,
        onDragEnd: this.onDragEnd,
      },
    };
  },
  methods: {
    updateText() {
      this.$emit('editNoteContent', this.id, this.$refs.note.innerText);
    },
    onDragEnd(positionDiff, absolutePosition) {
      this.$emit('setNotePosition', this.id, absolutePosition.left, absolutePosition.top);
    },
  },
  watch: {
    boundingBox(newVal) {
      if (newVal) {
        this.draggableValue.boundingElement = newVal;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/colors';
.wrapper {
  border: 1px solid black;
  width: 300px;
  height: 300px;
}
.note {
  &__item {
    background-color: $color-honey;
    box-shadow: 5px 5px 7px $color-grey-transparent;
    box-sizing: border-box;
    color: $color-black;
    cursor: pointer;
    flex: 0 0 120px;
    font-size: 14px;
    height: 120px;
    margin: 10px;
    padding: 15px;
    position: relative;
    width: 120px;

    &:hover,
    &:focus {
      box-shadow:7px 7px 5px $color-black-transparent;
    }

    &.yellow {
      background-color: $color-honey;
      transform:rotate(4deg);
    }

    &.brown {
      background-color: $color-latte;
      transform:rotate(-3deg);
    }

    &.orange {
      background-color: $color-gamboge;
      transform:rotate(5deg);
    }

    &.small {
      flex: 0 0 100px;
      font-size: 14px;
      height: 100px;
      padding: 15px;
      width: 100px;

      .note {
        &__delete {
          background: url('../../assets/icons/close.svg');
          background-size: 15px 15px;
          height: 15px;
          width: 15px;
        }
      }
    }
  }

  &__content {
    outline: none;
  }

  &__delete {
    background: url('../../assets/icons/close.svg');
    background-size: 20px 20px;
    font-weight: 700;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
  }

  &__save {
    cursor:pointer;
    display: block;
    font-size: 12px;
    margin: 6px 0;
    text-decoration: underline;
  }
}
</style>
