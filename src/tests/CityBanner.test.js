import React from 'react';
import { mount } from 'enzyme';
import CityBanner from './../Components/SubComponents/CityBanner';
import bannerImageUrl from './../sky_banner.png';

describe('CityBanner',() => {
  let props;
  let mountedCityBanner;

  const cityBanner = () => {
    if(!mountedCityBanner) {
      mountedCityBanner = mount(
        <CityBanner {...props} />
      );
    }
    return mountedCityBanner
  }

  beforeEach(() => {
    props = {
      newCity: "Amsterdam",
      newCitySlug: undefined
    }

    mountedCityBanner = undefined;
  });

  it("renders a standard image if `newCitySlug` is undefined", () =>{
    const image = cityBanner().find("img");
    expect(image.prop('src')).toBe(bannerImageUrl);
  });
});