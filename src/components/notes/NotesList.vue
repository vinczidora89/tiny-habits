<template>
    <div class="notes">
      <button v-if="showAddButton"
              @click="$emit('addNewNote')"
              class="notes__button">
        + Add note
      </button>
      <div class="notes__wrapper">
        <NoteItem v-for="(note, index) in notesConfig"
              :key="index"
              :bounding-box="boundingBox"
              :content="note.content"
              :empty-note-placeholder="emptyNotePlaceholder"
              :id="index"
              :note-size="noteSize"
              :should-be-draggable="shouldBeDraggable"
              :should-be-editable="shouldBeEditable"
              :type="note.type"
              @editNoteContent="editNoteContent"
              @deleteNote="deleteNote"
              @setNotePosition="setNotePosition"
              @setUnsaved="setUnsaved">
        </NoteItem>
      </div>
    </div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive';
import NoteItem from './NoteItem.vue';

export default {
  name: 'NotesList.vue',
  props: {
    boundingBox: {
      type: HTMLElement,
      required: false,
    },
    colourTypes: {
      type: Array,
      required: true,
    },
    emptyNotePlaceholder: {
      type: String,
      default: '...',
    },
    notesConfig: {
      type: Array,
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
    shouldBeEditable: {
      type: Boolean,
      default: false,
    },
    showAddButton: {
      type: Boolean,
      default: true,
    },
  },
  directives: {
    Draggable,
  },
  components: {
    NoteItem,
  },
  methods: {
    editNoteContent(id, text) {
      this.$emit('editNote', { id, text });
    },
    deleteNote(id) {
      this.$emit('deleteNote', id);
    },
    setNotePosition(id, left, top) {
      this.$emit('setNotePosition', { id, left, top });
    },
    setUnsaved(value) {
      this.$emit('setUnsaved', value);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/base';
@import '../../style/colors';

.notes {
  &__wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  &__button {
    @include button-option($color-rosewood, $color-off-white, 10px 10px);
  }
}
</style>
