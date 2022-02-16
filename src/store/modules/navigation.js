export default {
  namespaced: true,
  state: {
    currentScreen: 'IntroScreen',
  },
  mutations: {
    setCurrentScreen(state, value) {
      state.currentScreen = value;
    },
  },
};
