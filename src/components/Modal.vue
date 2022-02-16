<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
      <div class="modal">
        <button type="button" class="modal__button-close" @click="secondaryAction">
        </button>

        <div v-if="!hasError && isLoading" class="modal__loader-wrapper">
          <Loader></Loader>
        </div>

        <div v-if="hasError && !isLoading" class="modal__error-wrapper">
          <img class="modal__error-icon" src="../assets/icons/error.svg" alt="error icon">
          <span class="modal__error-text">
            Unfortunately something went wrong.
            Please try it again.
          </span>

          <button v-if="buttonTextPrimary"
                  type="button"
                  class="modal__button-primary"
                  @click="primaryAction">
            {{ buttonTextPrimary }}
          </button>
        </div>

        <div v-if="!(hasError || isLoading)" class="modal__wrapper">
          <h3 class="modal__header">
            <slot name="header"></slot>
          </h3>
          <div class="modal__body">
            <slot name="body" class="modal__body">
            </slot>
          </div>
          <div class="modal__buttons-wrapper">
            <button v-if="buttonTextPrimary"
                    type="button"
                    class="modal__button-primary"
                    @click="primaryAction">
              {{ buttonTextPrimary }}
            </button>
            <button v-if="buttonTextSecondary"
                    type="button"
                    class="modal__button-secondary"
                    @click="secondaryAction">
              {{ buttonTextSecondary }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import Loader from './Loader.vue';

export default {
  name: 'Modal.vue',
  components: {
    Loader,
  },
  props: {
    buttonTextPrimary: {
      type: String,
      required: false,
    },
    buttonTextSecondary: {
      type: String,
      required: false,
    },
  },
  methods: {
    primaryAction() {
      this.$emit('primaryAction');
    },
    secondaryAction() {
      this.$emit('secondaryAction');
      this.$emit('close');
    },
  },
  computed: {
    ...mapState('habits', ['hasError', 'isLoading']),
  },
};
</script>

<style scoped lang="scss">
  @import './../style/base';
  @import './../style/colors';

  .modal {
    background: $color-white;
    box-shadow: 2px 2px 20px 1px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    overflow-x: auto;
    padding: 20px;
    position: relative;
    width: 80%;

    &__backdrop {
      align-items: center;
      background-color: $color-black-transparent;
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
    }

    &__loader-wrapper {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    &__error {
      &-wrapper {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
      }

      &-icon {
        display: block;
        flex: 0 0 40px;
        height: 40px;
        margin: 0 auto 20px;
        width: 40px;
      }

      &-text {
        color: $color-firebrick;
        display: block;
        margin: 12px auto;
        max-width: 200px;
        text-align: center;
      }
    }

    &__header {
      font-size: 20px;
      margin: 10px 0;
    }

    &__body {
      position: relative;
    }

    &__button-close {
      background: url('../assets/icons/close.svg');
      background-size: 20px 20px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      height: 20px;
      outline: none;
      position: absolute;
      right: 5px;
      top: 5px;
      width: 20px;
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 270px;
    }

    &__button-primary,
    &__button-secondary {
      @include button-option($color-rosewood, $color-white, 10px 10px);
      margin: 20px auto 0;
      width: 120px;
    }

    &__button-secondary {
      @include button-option($color-latte, $color-black, 10px 10px);
    }
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

</style>
