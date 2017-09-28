import React from 'react';

let final_container = {
  position: 'relative',
  textAlign: 'center',
  height: '20vh'
}

let random_section = {
  position: 'absolute',
  width: '100%',
  bottom: '30%',
  left: '0'
}

let super_script = {
  verticalAlign: 'super',
  fontSize: '15px'
}
class RandomPosition extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOfSalaries: '',
      position: '',
      salary: '',
      currencyResponseRates: '',
    }
    this.fetchCurrencyResponseRates = this.fetchCurrencyResponseRates.bind(this);
    this.fetchPositionData = this.fetchPositionData.bind(this);
    this.changePosition = this.changePosition.bind(this);
  }

  componentDidMount () {
   this.fetchCurrencyResponseRates();          
  }

  changePosition () {
    let randomObject = this.state.listOfSalaries.salaries[Math.floor(Math.random()*this.state.listOfSalaries.salaries.length)];
    let randomPosition = randomObject.job.title;
    let randomSalary = randomObject.salary_percentiles.percentile_50;

    let configuredSalary = (randomSalary/this.state.currencyResponseRates['USD'])*this.state.currencyResponseRates[this.props.targetCurrency];
    let roundedConfiguredSalary = (Math.round(configuredSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    this.setState({
      position: randomPosition,
      salary: roundedConfiguredSalary
    })
  }

  fetchCurrencyResponseRates () {
    fetch('https://openexchangerates.org/api/latest.json?app_id=0cc840f2153c4d378b1a2687918435e7')
      .then((response) => {
        if (!response.ok) {
            throw Error('Something went wrong retreiving currency information :(');
        }
          return response.json();
      })
      .then((responseData) => {
        this.setState({
          currencyResponseRates: responseData.rates
        });
      })
      .then(() => {
        this.fetchPositionData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchPositionData () {
    fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/salaries/')
      .then((response) => {
        if (!response.ok) {
            throw Error('Something went wrong retreiving city information :(');
          }
          return response.json();
      })
      .then((responseData) => {
        let randomObject = responseData.salaries[Math.floor(Math.random()*responseData.salaries.length)];
        let randomPosition = randomObject.job.title;
        let randomSalary = randomObject.salary_percentiles.percentile_50;
          
        let configuredSalary = (randomSalary/this.state.currencyResponseRates['USD'])*this.state.currencyResponseRates[this.props.targetCurrency];
        let roundedConfiguredSalary = (Math.round(configuredSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        this.setState({
          listOfSalaries: responseData,
          position: randomPosition,
          salary: roundedConfiguredSalary
        });
      })
      .catch((error) => {
          console.log(error);
      });
  }
  render() {
    return (
      <div style={final_container} className="container">
        <div style={random_section} className='random-section'>
          <p className='random-salary-text'>The median salary for a/an&nbsp;
            <span className='random-position tooltip-top' onClick={this.changePosition}
            data-tooltip='Click for another occupation!'> {this.state.position} 
              <span style={super_script}> <i className="fa fa-user" aria-hidden="true"></i> </span>&nbsp;
            </span> 
          in {this.props.newCity} is around <span className='random-salary'>{this.props.targetCurrency} {this.state.salary}</span></p>
        </div>
      </div>
    )
  }
}

export default RandomPosition;