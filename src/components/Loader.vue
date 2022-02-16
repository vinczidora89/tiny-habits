<template>
  <div class="loader-ring">
    <div class="loader-ring__component"></div>
    <div class="loader-ring__component"></div>
    <div class="loader-ring__component"></div>
    <div class="loader-ring__component"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader.vue',
};
</script>

<style scoped lang="scss">
  @import './../style/colors';

  .loader-ring {
    display: inline-block;
    height: 80px;
    position: relative;
    width: 80px;

    &__component {
      animation: loader-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border: 8px solid $color-honey;
      border-color: $color-honey transparent transparent transparent;
      border-radius: 50%;
      box-sizing: border-box;
      display: block;
      height: 64px;
      margin: 8px;
      position: absolute;
      width: 64px;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  @keyframes loader-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
