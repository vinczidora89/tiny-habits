<template>
  <div class="countdown">
    <div class="countdown__clock">{{ clock }}</div>
    <button v-if="countdownButtonVisible" @click="toggleIsRunning" class="countdown__button">
      <span :class="['countdown__button-icon', {'pause' : isRunning}]"></span>
      <span class="countdown__button-text">{{ countdownButtonText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CountDown.vue',
  data() {
    return {
      countdown: null,
      isRunning: true,
      minutes: null,
      seconds: null,
      pausedSeconds: null,
    };
  },
  props: {
    countdownMinutes: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.timer(this.countdownMinutes * 60);
  },
  methods: {
    timer(seconds) {
      const now = Date.now();
      const then = now + seconds * 1000;
      this.setTimeLeft(seconds);

      this.countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0 || !this.isRunning) {
          clearInterval(this.countdown);
          if (secondsLeft < 0) {
            this.$emit('handleCountdownFinish');
          }
          return;
        }
        this.setTimeLeft(secondsLeft);
      }, 1000);
    },
    setTimeLeft(seconds) {
      this.minutes = this.transformToTwoDigits(Math.floor(seconds / 60));
      this.seconds = this.transformToTwoDigits(seconds % 60);
    },
    transformToTwoDigits(number) {
      return number < 10 ? `0${number}` : number;
    },
    toggleIsRunning() {
      this.isRunning = !this.isRunning;
    },
  },
  computed: {
    clock() {
      return `${this.minutes}:${this.seconds}`;
    },
    countdownButtonVisible() {
      return !(this.minutes <= 0 && this.seconds <= 0);
    },
    countdownButtonText() {
      return this.isRunning ? 'Pause' : 'Resume';
    },
  },
  watch: {
    isRunning(value) {
      if (!value) {
        this.pausedSeconds = this.minutes * 60 + this.seconds;
        return;
      }
      this.timer(this.pausedSeconds);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/base";
@import "../style/colors";

.countdown {
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin: 20px 0;
  min-height: 104px;

  &__clock {
    font-size: 50px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  &__button {
    background-color: transparent;
    border: 2px solid $color-black;
    border-radius: 8px;
    color: $color-black;
    cursor: pointer;
    display: flex;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 700;
    min-width: 100px;
    outline: unset;
    padding: 4px 8px;
    text-transform: uppercase;

    &-icon {
      background: url('../assets/icons/play.svg');
      display: block;
      height: 24px;
      margin: 0 5px 0 0;
      width: 24px;

      &.pause {
        background: url('../assets/icons/pause.svg');
      }
    }

    &-text {
      display: block;
      font-size: 12px;
      line-height: 24px;
      min-width: 55px;
    }
  }
}
</style>
