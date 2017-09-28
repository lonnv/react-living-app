import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import CityBanner from './../Components/SubComponents/CityBanner';
import bannerImageUrl from './../sky_banner.png';

describe('CityBanner', () => {

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

  // it("calls setBannerImage if `newCitySlug` is defined", () => {
  //   const setBannerImage = jest.fn().mockImplementation(() => {
  //     this.setState({bannerImage: "amsterdam.png"})
  //   })
  //   cityBanner().setProps({newCitySlug: 'amsterdam'});
  //   const image = cityBanner().find("img");
  //   expect(image.prop('src')).toBe('amsterdam.png');
  // })
});