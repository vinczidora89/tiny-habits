<template>
  <div v-if="countdownStarted && !countdownCompleted" class="timer">
    <flip-countdown class="timer__clock"
                    :deadline=deadline
                    :showDays="false"
                    :showHours="false"
                    @timeElapsed="$emit('handleCountdownFinish')">
    </flip-countdown>
  </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown';
import moment from 'moment';

const format = 'YYYY-MM-DD HH:mm:ss';

export default {
  name: 'Timer.vue',
  components: {
    FlipCountdown,
  },
  props: {
    countdownCompleted: {
      type: Boolean,
      required: true,
    },
    countdownMinutes: {
      type: Number,
      required: true,
    },
    countdownStarted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      deadline: null,
    };
  },
  created() {
    this.deadline = moment().add(this.countdownMinutes, 'm').format(format);
  },
};
</script>

<style scoped lang="scss">
</style>
