import React from 'react';
let icon_index = {
  display: 'block',
  margin: '0 auto'
}

let percent_index_text = {
  color: '#FFF',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '30px',
  textAlign: 'center',
  width: '50%',
  marginBottom: '0',
  display: 'block',
  margin: '0 auto'
}

let percent_index_text_no_change = {
  color: '#FFF',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '15.5px',
  textAlign: 'center',
  width: '50%',
  display: 'block',
  margin: '12px auto'
}

let up_arrow_index = {
  color: 'rgb(61, 242, 255)',
  fontSize: '20px',
  marginLeft: '3px'
}

let down_arrow_index = {
  color: 'rgb(234, 76, 136)',
  fontSize: '20px',
  marginLeft: '3px'
}
let sub_salary_text = {
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '20px',
  fontWeight: '400',
  marginBottom: '0',
  paddingTop: '10px',
  display: 'block',
  margin: '0 auto'
}
class CompareCityInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      percentChanges: this.getPercentChanges()
    }
    this.getPercentChanges = this.getPercentChanges.bind(this);
  }

  getPercentChanges() {
    const dataSet = require('./../../data/cost_of_living_indices.json');

    const getPercentChangeData = (category) => {
      let newCityIndex = dataSet[this.props.newCity][`${category}_index`] ;
      let currentCityIndex = dataSet[this.props.currentCity][`${category}_index`];
      let percentChange = Math.round(( newCityIndex - currentCityIndex )/currentCityIndex * 100);
      return ({
        percentChange: percentChange,
        absoluteChange: Math.abs(percentChange),
        positiveChange: (percentChange > 0) ? true : false
      })
    };

    return ({
      rent: getPercentChangeData("rent"),
      groceries: getPercentChangeData("groceries"),
      restaurant: getPercentChangeData("restaurant"),
      purchasing: getPercentChangeData("purchasing")
    })
  }
  render () {
    return (
      <div className='row compare-city-info'>
        {!this.props.isASpotAHomeCity() && <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
          <div style={icon_index} id="icon-box">
              <span><i className="fa fa-home fa fa-lg-modification"></i></span>
          </div>
          <p style={sub_salary_text}>Rent/Living</p>
          {(this.state.percentChanges.rent.positiveChange) && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Rent is '+this.state.percentChanges.rent.absoluteChange+'% more expensive in '+this.props.newCity+'!'}> {this.state.percentChanges.rent.absoluteChange}%
            <i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.rent.positiveChange && this.state.percentChanges.rent.percentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Rent is cheaper by '+this.state.percentChanges.rent.absoluteChange+'% in '+this.props.newCity+'.'}> {this.state.percentChanges.rent.absoluteChange}%
            <i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.rent.positiveChange && this.state.percentChanges.rent.percentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom" 
          data-tooltip={'Rent is about the same!'}> It's the same!
          </p>}
        </div>}

        {this.props.isASpotAHomeCity() && <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
          <div onClick={this.props.openSpotAHomeDetails} style={icon_index} id="spotahome-icon-box">
              <span><i className="fa fa-strikethrough fa fa-spotahome-lg-modification"></i></span>
          </div>
          <p onClick={this.props.openSpotAHomeDetails} style={sub_salary_text} className="tooltip-top" data-tooltip={'Let Spotahome help in your move to ' + this.props.newCity + '!'}>Rent/Living</p>
          {(this.state.percentChanges.rent.positiveChange) && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Rent is '+this.state.percentChanges.rent.absoluteChange+'% more expensive in '+this.props.newCity+'!'}> {this.state.percentChanges.rent.absoluteChange}%
            <i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.rent.positiveChange && this.state.percentChanges.rent.percentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Rent is cheaper by '+this.state.percentChanges.rent.absoluteChange+'% in '+this.props.newCity+'.'} onClick={this.props.openSpotAHomeDetails}> {this.state.percentChanges.rent.absoluteChange}%
            <i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.rent.positiveChange && this.state.percentChanges.rent.percentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom" 
          data-tooltip={'Rent is about the same!'} onClick={this.props.openSpotAHomeDetails}> It's the same!
          </p>}
        </div>}
        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
          <div style={icon_index} id="icon-box">
              <span><i className="fa fa-shopping-cart fa fa-lg-modification"></i></span>
          </div>
          <p style={sub_salary_text}>Groceries</p>
          {this.state.percentChanges.groceries.positiveChange && <p style={percent_index_text} className="tooltip-bottom"
          data-tooltip={'Groceries are '+this.state.percentChanges.groceries.absoluteChange+'% more expensive in '+this.props.newCity+'!'} > {this.state.percentChanges.groceries.absoluteChange}%
            <i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.groceries.positiveChange && this.state.percentChanges.groceries.percentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom"
          data-tooltip={'Groceries are cheaper by '+this.state.percentChanges.groceries.absoluteChange+'% in '+this.props.newCity+'.'} > {this.state.percentChanges.groceries.absoluteChange}%
            <i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.groceries.positiveChange && this.state.percentChanges.groceries.percentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom"
          data-tooltip={'Groceries are about the same!'} > It's the same!
          </p>}
        </div>
        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
          <div style={icon_index} id="icon-box">
              <span><i className="fa fa-cutlery fa fa-lg-modification"></i></span>
          </div>
          <p style={sub_salary_text}>Dining Out</p>
          {this.state.percentChanges.restaurant.positiveChange && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Dining out is '+this.state.percentChanges.restaurant.absoluteChange+'% more expensive in '+this.props.newCity+'!'} > {this.state.percentChanges.restaurant.absoluteChange}%
            <i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.restaurant.positiveChange && this.state.percentChanges.restaurant.percentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom" 
          data-tooltip={'Dining out is cheaper by '+this.state.percentChanges.restaurant.absoluteChange+'% in '+this.props.newCity+'.'} > {this.state.percentChanges.restaurant.absoluteChange}%
            <i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.restaurant.positiveChange && this.state.percentChanges.restaurant.percentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom" 
          data-tooltip={'Dining out is about the same!'} > It's the same!
          </p>}
        </div>
        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
          <div style={icon_index} id="icon-box">
              <span><i className="fa fa-star fa fa-lg-modification"></i></span>
          </div>
          <p style={sub_salary_text}>Purchasing Power</p>
          {this.state.percentChanges.purchasing.positiveChange && <p style={percent_index_text} className="tooltip-bottom"
          data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+this.state.percentChanges.purchasing.absoluteChange+'% higher in '+this.props.newCity+'.'} > {this.state.percentChanges.purchasing.absoluteChange}%
            <i style={down_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.purchasing.positiveChange && this.state.percentChanges.purchasing.percentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom"
          data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+this.state.percentChanges.purchasing.absoluteChange+'% lower in '+this.props.newCity+'!'} > {this.state.percentChanges.purchasing.absoluteChange}%
            <i style={up_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
          </p>}
          {(!this.state.percentChanges.purchasing.positiveChange && this.state.percentChanges.purchasing.percentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom"
          data-tooltip={'The purchasing power is about the same!'} > It's the same!
          </p>}
        </div>
      </div>
    );
  }
}

export default CompareCityInfo;