import Vuex from 'vuex';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
describe('Modal', () => {
  let store;
  const state = {
    hasError: false,
    isLoading: false,
  };
  const mutations = {
    setHasError: () => true,
    setIsLoading: () => true,
  };
  let component;
  let closeButton;
  let primaryButton;
  let secondaryButton;
  // const mockMethod = sinon.spy();

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations,
    });

    const buttonTextPrimary = 'primary button';
    const buttonTextSecondary = 'secondary button';

    component = shallowMount(Modal, {
      store,
      localVue,
      propsData: { buttonTextPrimary, buttonTextSecondary },
    });

    primaryButton = component.find('.modal__button-primary');
    secondaryButton = component.find('.modal__button-secondary');
    closeButton = component.find('.modal__button-close');
  });

  describe('Modal.vue', () => {
    it('renders button when props are passed', () => {
      expect(primaryButton.text()).to.include('primary button');
      expect(secondaryButton.text()).to.include('secondary button');
    });
  });

  describe('Modal.vue', () => {
    it('emits a primary event on primary button click', () => {
      primaryButton.trigger('click');
      expect(component.emitted().primaryAction.length).to.be.equal(1);
    });
    it('emits a secondary event on secondary button click', () => {
      secondaryButton.trigger('click');
      expect(component.emitted().secondaryAction.length).to.be.equal(1);
    });
    it('emits a close event on secondary button click and close button click', () => {
      secondaryButton.trigger('click');
      closeButton.trigger('click');
      expect(component.emitted().close.length).to.be.equal(2);
    });
  });
});
