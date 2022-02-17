<template>
  <div id="app" class="app">
    <div class="app__wrapper">
      <component v-bind:is="this.currentScreen"></component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BrainstormScreen from './components/screens/BrainstormScreen.vue';
import DashboardScreen from './components/screens/DashboardScreen.vue';
import GoalScreen from './components/screens/GoalScreen.vue';
import IntroScreen from './components/screens/IntroScreen.vue';
import MappingScreen from './components/screens/MappingScreen.vue';

export default {
  name: 'App',
  components: {
    BrainstormScreen,
    DashboardScreen,
    GoalScreen,
    IntroScreen,
    MappingScreen,
  },
  created() {
    this.initState();
  },
  methods: {
    ...mapActions('habits', ['initState']),
  },
  computed: {
    ...mapState('navigation', ['currentScreen']),
  },
};
</script>

<style lang="scss">
@import "style/base";
@import "style/colors";
@import "style/media-selectors";

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

.app {
  align-items: center;
  background: url('assets/images/bgr_large.jpg') center no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-items: center;
  min-height: 100vh;

  &__wrapper {
    background-color: $color-white;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    margin: 50px auto;
    max-width: 600px;
    padding: 20px 40px;
    width: 100%;
  }

  @media #{$tablet} {
    background: url('assets/images/bgr_small.jpg') bottom center no-repeat;
    background-size: 100% 100%;
  }

  @media #{$mobile} {
    align-items: flex-start;
    background-image: none;

    &__wrapper {
      border-radius: 0;
      box-shadow: none;
      margin: 10px auto;
    }
  }
}
</style>
