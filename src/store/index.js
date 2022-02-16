import Vue from 'vue';
import Vuex from 'vuex';
import habits from './modules/habits';
import navigation from './modules/navigation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    habits,
    navigation,
  },
});
