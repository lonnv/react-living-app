import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './../Components/App';
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

  describe('when `step` is 1', () => {
    beforeEach(() => {
      appWrapper.setState({step: 1})
    });

    it('always renders a `WelcomeComponent`', () => {
      expect(appWrapper.find('WelcomeComponent')).toHaveLength(1);
    });
  });

  describe('when `step` is 2', () => {
    beforeEach(() => {
      appWrapper.setState({step: 2})
    });

    it('always renders `CityDropDownComponent', () => {
      expect(appWrapper.find('CityDropDownComponent')).toHaveLength(1);
    });
  });

  describe('when `step` is 3', () => {
    beforeEach(() => {
      appWrapper.setState({step: 3})
    });

    it('always renders `CurrentCostOfLivingComponent', () => {
      expect(appWrapper.find('CurrentCostOfLivingComponent')).toHaveLength(1);
    });
  });

  describe('when `step` is 4', () => {
    beforeEach(() => {
      appWrapper.setState({step: 4})
    });

    it('always renders `CityDropDownComponent', () => {
      expect(appWrapper.find('CityDropDownComponent')).toHaveLength(1);
    });
  });

  describe('when `step` is 5', () => {
    it('doesnt render `NewCostOfLivingComponent` with default state', () => {
      const test = () => {
        appWrapper.setState({
          step: 5
        })
      };
      expect(test).toThrowError(TypeError);
    }); 

    it('renders `NewCostOfLivingComponent` when App has the right state', () => {
      appWrapper.setState({
        currentCity: "Amsterdam, Netherlands",
        newCity: "The Hague (Den Haag), Netherlands",
        newCitySlug: "the-hague",
        step: 5
      })
      expect(appWrapper.find('NewCostOfLivingComponent')).toHaveLength(1);
    });
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
