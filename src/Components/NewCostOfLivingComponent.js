import React from 'react';
import Cities from './SubComponents/Cities';
import SpotAHomeDetailsComponent from './SubComponents/SpotAHomeDetailsComponent';
import CityBanner from './SubComponents/CityBanner'
import ComparableSalary from './SubComponents/ComparableSalary'
import CompareCityInfo from './SubComponents/CompareCityInfo'
import RandomPosition from './SubComponents/RandomPosition'

let full_page_height = {
	height: '100%'
}

let buttons_container = {
	position: 'absolute',
    zIndex: '999',
    top: '10px',
    left: '5px'
}

let search_container = {
	width: '150px',
	textAlign: 'center',
    position: 'absolute',
    zIndex: '999',
    top: '10px',
    right: '5px',
    opacity: '0.94'
}

let information_icon_container = {
	position: 'absolute',
    zIndex: '999',
    top: '15px',
    right: '30px',
    cursor: 'pointer',
    fontFamily: 'Nunito, sans-serif',
    textAlign: 'center',
    fontWeight: '700',
    height: '50px'
}

let information_icon = {
	color: '#ea4c88',
	backgroundColor: 'rgb(243, 243, 243)',
    borderRadius: '100px',
    boxShadow: '0px 0px 3px rgb(243, 243, 243)',
    padding: '5px 10px',
    fontSize: '16px'
}

let continue_button = {
	height: '38px',
    padding: '0 15px',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '38px',
    letterSpacing: '.1rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    border: '1px solid #bbb',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'inline-block',
    color: '#FFF',
    backgroundColor: '#ea4c88',
    borderColor: '#ea4c88',
    margin: '0 10px'
}

let middle_container = {
	position: 'relative',
	padding: '30px'
}

class NewCostOfLivingComponent extends React.Component {
	constructor (props) {
		super(props);
		const dataSet = require('../data/cost_of_living_indices.json');

		if (this.props.newCitySlug) {		
			this.state = {
				listOfSalaries: '',
				position: '',
				currentCurrency: dataSet[this.props.currentCity].currency_type,
				targetCurrency: dataSet[this.props.newCity].currency_type,
				currencyResponseRates: '',
				salary: '',
				onLastPage: true,
				openSpotAHomeDetails: false
			}
		} else {
			this.state = {
				currentCurrency: dataSet[this.props.currentCity].currency_type,
				targetCurrency: dataSet[this.props.newCity].currency_type,
				currencyResponseRates: '',
				lastPage: true,
				openSpotAHomeDetails: false
			}
		}
    this.fetchCurrencyResponseRates = this.fetchCurrencyResponseRates.bind(this);
		this.changePosition = this.changePosition.bind(this);
	}

	componentDidMount () {
    Promise.resolve(this.fetchCurrencyResponseRates()).then(() => {
    	if (this.props.newCitySlug) {
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
          	
        	let configuredSalary = (randomSalary/this.state.currencyResponseRates['USD'])*this.state.currencyResponseRates[this.state.targetCurrency];
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
    });    				
	}

	changePosition () {
		let randomObject = this.state.listOfSalaries.salaries[Math.floor(Math.random()*this.state.listOfSalaries.salaries.length)];
		let randomPosition = randomObject.job.title;
		let randomSalary = randomObject.salary_percentiles.percentile_50;

		let configuredSalary = (randomSalary/this.state.currencyResponseRates['USD'])*this.state.currencyResponseRates[this.state.targetCurrency];
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
			.catch((error) => {
      	console.log(error);
    	});
	}

	refreshCity = (e) => {
		this.props.handleRefreshCityFunction(e);
	}

	isASpotAHomeCity = () => {
		if (this.props.newCity === 'Madrid, Spain' 
			|| this.props.newCity === 'Barcelona, Spain' 
			|| this.props.newCity === 'Bilbao, Spain'
			|| this.props.newCity === 'Valencia, Spain'
			|| this.props.newCity === 'Granada, Spain'
			|| this.props.newCity === 'Seville, Spain'
			|| this.props.newCity === 'Brussels, Belgium'
			|| this.props.newCity === 'London, United Kingdom'
			|| this.props.newCity === 'Rome, Italy'
			|| this.props.newCity === 'Milan, Italy'
			|| this.props.newCity === 'Paris, France'
			|| this.props.newCity === 'Lyon, France'
			|| this.props.newCity === 'Dublin, Ireland'
			|| this.props.newCity === 'Dubai, United Arab Emirates'
			|| this.props.newCity === 'Berlin, Germany'
			|| this.props.newCity === 'Vienna, Austria'
		) {
			return true;
		}
	}

	openSpotAHomeDetails = () => {
		this.setState({	
			openSpotAHomeDetails: true 
		});
	}

	closeSpotAHomeDetails = () => {
		this.setState({	
			openSpotAHomeDetails: false 
		});
	}

	render () {

		const dataSet = require('../data/cost_of_living_indices.json');		
		return (
			<div style={full_page_height}>
				{!this.state.openSpotAHomeDetails && <div>
					<div style={buttons_container}>
						<button style={continue_button} onClick={this.props.resetToFirstStep}>Menu</button>
					</div>

					{(this.props.currencyType === dataSet[this.props.currentCity].currency_type) && <div>
						<div className="search_question_container tooltip-left" data-tooltip={"Pick another city to compare its Cost of Living to living in -  " + this.props.currentCity + " with a net income of " + this.state.currentCurrency + " " + this.props.currentCostOfLiving + "."}>
							<i style={information_icon} className="fa fa-question" aria-hidden="true"></i>
						</div>
						<div style={search_container}>
							<Cities onLastPage={this.state.onLastPage} onChange={this.refreshCity} searchable />
						</div>
					</div>}


					{(this.props.currencyType !== dataSet[this.props.currentCity].currency_type) && <div style={information_icon_container} className="tooltip-left" data-tooltip='Convert back to your base currency to be able compare the Cost of Living with another city!'>
						<i style={information_icon} className="fa fa-info" aria-hidden="true"></i>
					</div>}

					<div style={full_page_height}>
            <CityBanner  
              bannerImage={this.state.bannerImage}
              bannerIntro={this.state.bannerIntro}
							newCitySlug={this.props.newCitySlug}
							newCity={this.props.newCity}
						/>				


					<div style={middle_container} className="container" >
						  <ComparableSalary 
						    exactNewCostOfLivingValue={this.props.exactNewCostOfLivingValue}
                currentCurrency={this.state.currentCurrency}
                targetCurrency={this.state.targetCurrency}
                currencyType={this.props.currencyType}
                value={this.props.value}
                newCitySlug={this.props.newCitySlug}
							  newCity={this.props.newCity}
							  currentCity={this.props.currentCity}
							  currencyResponseRates={this.state.currencyResponseRates}
							  changeCurrencyTypeAndValue={this.props.changeCurrencyTypeAndValue}			
						  />

						  <CompareCityInfo
               isASpotAHomeCity={this.isASpotAHomeCity}
               openSpotAHomeDetails={this.openSpotAHomeDetails}
						   newCity={this.props.newCity}
						   currentCity={this.props.currentCity}
						  />
					</div>

						{(this.props.newCitySlug) && <RandomPosition />}

					</div>
				</div>}

				{(this.state.openSpotAHomeDetails) && 
					<SpotAHomeDetailsComponent closeSpotAHomeDetails={this.closeSpotAHomeDetails}
						newCity={this.props.newCity}/>
				}
			</div>
		);
	}
}

export default NewCostOfLivingComponent;