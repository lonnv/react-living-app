import React from 'react';
import bannerImageUrl from '../../sky_banner.png';

let image_container = {
  position: 'relative'
}


class CityBanner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bannerImage: bannerImageUrl
    }
    this.setBannerImage = this.setBannerImage.bind(this);
    this.setBannerIntro = this.setBannerIntro.bind(this);
  }
  
  componentDidMount () {
    if (this.props.newCitySlug) {
     this.setBannerImage();
     this.setBannerIntro();
    }
  }

  setBannerImage () {
    fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/images/')
      .then((response) => {
          if (!response.ok) {
            throw Error('Something went wrong retreiving an image :(');
          }
          return response.json();
      })
      .then((responseData) => {
        this.setState({
          bannerImage: responseData.photos[0].image.web
        });
      })
      .catch((error) => {
          console.log(error);
      });
  }

  setBannerIntro () {
    fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/scores/')
      .then((response) => {
          if (!response.ok) {
            throw Error('Something went wrong retreiving city information :(');
          }
          return response.json();
      })
      .then((responseData) => {
        let divElement = document.createElement("div");
        divElement.innerHTML = responseData.summary;
        
        let byLine = divElement.querySelector('i')
        byLine ? byLine.remove()

        let textElement = divElement.textContent || divElement.innerText || "";
        let firstSentence = textElement.split(".")[0];

        this.setState({
          bannerIntro: firstSentence
        });
      })
      .catch((error) => {
          console.log(error);
      });
  }

  render () {
    return (
      <div style={image_container} className="background-darken">
      <img src={this.state.bannerImage} style={{width: '100%', opacity: '0.4', 'height': '30vh'}} alt='City Banner'/>
        <div>
          {(this.props.newCitySlug) && <div className="banner-image-intro">{this.props.newCity}<br/>
            <span className="banner-image-sub-intro">{this.state.bannerIntro}.</span>
          </div>}
          {(!this.props.newCitySlug) && <div className="alternative-banner-image-intro">{this.props.newCity}</div>}
        </div>
      </div>
    )
  }
}
export default CityBanner;

