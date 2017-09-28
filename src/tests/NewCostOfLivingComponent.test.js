import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render, mount } from 'enzyme';
import NewCostOfLivingComponent from './../Components/NewCostOfLivingComponent';

describe('NewCOL', () => {
  let props;
  let mountedNewCOL;

  const newCOL = () => {
    if(!mountedNewCOL) {
      mountedNewCOL = mount(
      <NewCostOfLivingComponent {...props} />
      );
    }
    return mountedNewCOL;
  }

  beforeEach(() => {
    let resetToFirstStepMock = jest.fn();
    let changeCurrencyTypeAndValueMock = jest.fn();
    let handleRefreshCityFunctionMock = jest.fn();
    
    props = {
      key: undefined,
      value: 0,
      exactNewCostOfLivingValue: 0,
      currentCostOfLiving: '',
      currentCity: "Amsterdam, Netherlands",
      newCity: "The Hague (Den Haag), Netherlands",
      newCitySlug: "the-hague",
      currencyType: "EUR",
      rentPercentChange: 0,
      groceriesPercentChange: 0,
      restaurantPercentChange: 0,
      purchasingPercentChange: 0,
      resetToFirstStep: resetToFirstStepMock,
      changeCurrencyTypeAndValue: changeCurrencyTypeAndValueMock,
      handleRefreshCityFunction: handleRefreshCityFunctionMock
    }

    mountedNewCOL = undefined;
  });

  it("alway renders a new city information banner", () => {
    const cityInfoBanner = newCOL().find("div.background-darken");
    expect(cityInfoBanner.length).toBe(1);
  });

  it("always renders a comparable salary section", () => {
    const comparableSalaryText = newCOL().find("p.comparable-salary");
    expect(comparableSalaryText.length).toBe(1);
  });

  it("always renders a compare city info row", () => {
    const compareCityInfo = newCOL().find("div.compare-city-info");
    expect(compareCityInfo.length).toBe(1);
  });

  it("renders a RandomCareer section when the newCitySlug is defined", () => {
    const randomCareerSection = newCOL().find("div.random-section");
    expect(randomCareerSection.length).toBe(1);
  });

  it("doesnt render a RandomCareer section when props.newCitySlug is undefined", () => {
    newCOL().setProps({newCitySlug: undefined});
    const randomCareerSection = newCOL().find("div.random-section");
    expect(randomCareerSection.length).toBe(0);
  });

  //Needs work
  // it("renders SpotAtHomeDetails when openSpotAHomeDetails is set to true", () => {
  //   newCOL().setProps({newCity: 'London, United Kingdom'});
  //   expect(newCOL().find('SpotAtHomeDetailsComponent')).toHaveLength(1);
  // });
});

  