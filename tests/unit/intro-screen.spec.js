import Vuex from 'vuex';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import IntroScreen from '@/components/screens/IntroScreen.vue';

chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
describe('IntroScreen', () => {
  let store;
  const mutations = {
    setCurrentScreen: () => true,
  };
  let component;
  const mockMethod = sinon.spy();

  beforeEach(() => {
    store = new Vuex.Store({
      mutations,
    });

    component = shallowMount(IntroScreen, {
      store,
      localVue,
    });
  });

  describe('calls setCurrentScreen', () => {
    it('clicking the button', () => {
      component.setMethods({ setCurrentScreen: mockMethod });
      component.find('.intro__button').trigger('click');
      expect(mockMethod).to.have.been.called.calledWith('GoalScreen');
    });
  });
});
