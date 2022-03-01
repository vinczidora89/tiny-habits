import Vue from 'vue';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ModalItem from '@/components/ModalItem.vue';
import habits from '../../src/store/modules/habits';

chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);

const storeOptions = {
  modules: {
    habits,
  },
};

describe('Modal', () => {
  let store;
  let component;
  let componentInstance;
  let closeButton;
  let primaryButton;
  let secondaryButton;

  beforeEach(() => {
    store = new Vuex.Store({
      ...storeOptions,
    });

    const buttonTextPrimary = 'primary button';
    const buttonTextSecondary = 'secondary button';

    component = shallowMount(ModalItem, {
      store,
      localVue,
      propsData: { buttonTextPrimary, buttonTextSecondary },
    });

    componentInstance = component.vm;

    primaryButton = component.find('.modal__button-primary');
    secondaryButton = component.find('.modal__button-secondary');
    closeButton = component.find('.modal__button-close');
  });

  afterEach(() => {
    const { setHasError, setIsLoading } = habits.mutations;
    setHasError(habits.state, false);
    setIsLoading(habits.state, false);
  });

  describe('ModalItem.vue', () => {
    it('sets shouldShowContent computed property and visible content', () => {
      expect(componentInstance.shouldShowContent).to.be.eql(true);
      expect(componentInstance.shouldShowLoading).to.be.eql(false);
      expect(componentInstance.shouldShowError).to.be.eql(false);

      expect(component.find('.modal__wrapper').exists()).to.be.equal(true);
    });
  });

  describe('ModalItem.vue', () => {
    it('sets shouldShowLoading computed property and visible loading', async () => {
      const { setIsLoading } = habits.mutations;
      setIsLoading(habits.state, true);
      await Vue.nextTick();

      expect(componentInstance.shouldShowContent).to.be.eql(false);
      expect(componentInstance.shouldShowLoading).to.be.eql(true);
      expect(componentInstance.shouldShowError).to.be.eql(false);

      expect(component.find('.modal__loader-wrapper').exists()).to.be.equal(true);
    });
  });

  describe('ModalItem.vue', () => {
    it('sets shouldShowError computed property and visible error', async () => {
      const { setHasError } = habits.mutations;
      setHasError(habits.state, true);
      await Vue.nextTick();

      expect(componentInstance.shouldShowContent).to.be.eql(false);
      expect(componentInstance.shouldShowLoading).to.be.eql(false);
      expect(componentInstance.shouldShowError).to.be.eql(true);

      expect(component.find('.modal__error-wrapper').exists()).to.be.equal(true);
    });
  });

  describe('ModalItem.vue', () => {
    it('renders button when props are passed', () => {
      expect(primaryButton.text()).to.include('primary button');
      expect(secondaryButton.text()).to.include('secondary button');
    });
  });

  describe('ModalItem.vue', () => {
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
