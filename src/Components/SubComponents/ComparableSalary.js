import React from 'react';

let intro = {
  color: '#FFF',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '25px',
  fontWeight: '200',
  textAlign: 'center',
  marginTop: '1rem',
  marginBottom: '0'
}

let comparable_salary_text = {
  color: '#3DF2FF',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '50px',
  textAlign: 'center',
  marginBottom: '3rem',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto'
}

let alternative_comparable_salary_text = {
  color: '#3DF2FF',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '50px',
  textAlign: 'center',
  marginBottom: '7rem',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto'
}

let salary_sub_properties = {
  fontWeight: '700',
  paddingLeft: '10px',
  fontSize: '20px',
}

class ComparableSalary extends React.Component {
  constructor (props) {
    super(props);
    this.changeCurrencyTypeAndValue = this.changeCurrencyTypeAndValue.bind(this);
  }

  changeCurrencyTypeAndValue () {
    let originalCurrencyType = this.props.currencyType;
    let originalExactValue = this.props.exactNewCostOfLivingValue;
    
    const dataSet = require('./../../data/cost_of_living_indices.json');
    let currencyTypeNewCity = dataSet[this.props.newCity].currency_type
    let currencyTypeOldCity = dataSet[this.props.currentCity].currency_type;
    let newCurrencyType = (originalCurrencyType === currencyTypeNewCity) ? currencyTypeOldCity : currencyTypeNewCity
    // Refactor two lines below?
    let exactValue = (originalExactValue/this.props.currencyResponseRates[originalCurrencyType])*this.props.currencyResponseRates[newCurrencyType];
    this.props.changeCurrencyTypeAndValue(exactValue, (Math.round(exactValue/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), newCurrencyType);
  }

  render () {
    return (
    <div>
      <p style={intro} className="comparable-salary">To have the same standard of living, a comparable salary would be</p>
      <div> 
        <p style={ this.props.newCitySlug ? comparable_salary_text : alternative_comparable_salary_text }
          onClick={this.changeCurrencyTypeAndValue}
        >
          ≈ {this.props.currencyType} {this.props.value}
        {(this.props.currentCurrency !== this.props.targetCurrency) &&
          <sub style={salary_sub_properties} className='tooltip-bottom' 
            data-tooltip='Click to convert the currency!'
          >
            <i className="fa fa-exchange exchange-icon" aria-hidden="true"></i>
          </sub>
        }
        </p>
      </div>
     </div>
    );
  }
}
export default ComparableSalary;

