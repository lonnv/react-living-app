import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './Components/App';

let appWrapper;

describe('App', () => {
  beforeEach( () => {
    appWrapper = mount(
      <App />
    );
  });

  it('renders', () => {
    expect(appWrapper.instance()).toBeInstanceOf(App);
  });

  describe('#nextStep', () => {
    it('sets nextStep from 1 to 2 correctly', () => {
      appWrapper.instance().nextStep();
      expect(appWrapper.state().step).toBe(2);
    });
  });

  describe('#previousStep', () => {
    it('sets previousStep from 2 to 1 correctly', () => {
      appWrapper.setState({step: 2})
      appWrapper.instance().previousStep();
      expect(appWrapper.state().step).toBe(1);
    });

    it('sets previousStep from 1 to 1 correctly', () => {
      appWrapper.instance().previousStep();
      expect(appWrapper.state().step).toBe(1);
    });
  });

  describe('#resetToFirstStep', () => {
    it('sets the step back to 1 correctly', () => {
      appWrapper.setState({step: 2})
      appWrapper.instance().resetToFirstStep();
      expect(appWrapper.state().step).toBe(1);
    });
  });
});
