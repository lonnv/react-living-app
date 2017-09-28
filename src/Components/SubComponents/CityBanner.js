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
  }
  
  componentDidMount () {
    if (this.props.newCitySlug) {
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
  }

  render () {
    return (
      <div style={image_container} className="background-darken">
      <img src={this.state.bannerImage} style={{width: '100%', opacity: '0.4', 'height': '30vh'}} alt='City Banner'/>
        <div>
          {(this.props.newCitySlug) && <div className="banner-image-intro">{this.props.newCity}<br/>
            {(this.props.newCitySlug !== 'london' && this.props.newCitySlug !== 'moscow' && this.props.newCitySlug !== 'brussels') && <span className="banner-image-sub-intro">{this.props.bannerIntro}.</span>}
            {(this.props.newCitySlug === 'london') && <span className="banner-image-sub-intro">London is one of the world's most inviting cities for startups, as well as home to world-class schools, universities and museums.</span>}
            {(this.props.newCitySlug === 'moscow') && <span className="banner-image-sub-intro">Moscow is a lively city, rich in history and culture and is Russia's national center for visual and performing arts.</span>}
            {(this.props.newCitySlug === 'brussels') && <span className="banner-image-sub-intro">Life in Brussels is a culturally rich, central-European adventure, home to much of the European Union infrastructure</span>}
          </div>}
          {(!this.props.newCitySlug) && <div className="alternative-banner-image-intro">{this.props.newCity}</div>}
        </div>
      </div>
    )
  }
}
export default CityBanner;

