<template>
  <Note :content="goldenBehaviour.content"
        empty-note-placeholder="..."
        :id="0"
        :note-size="isSmall ? 'small' : 'normal'"
        :should-be-draggable="false"
        :should-be-editable="false"
        :should-be-deletable="false"
        :type="goldenBehaviour.type">
  </Note>
</template>

<script>
import { mapState } from 'vuex';
import Note from './Note.vue';

export default {
  name: 'GoldenBehaviourNote.vue',
  components: {
    Note,
  },
  props: {
    isSmall: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('habits', ['goldenBehaviour']),
  },
};
</script>

<style scoped lang="scss">

</style>
