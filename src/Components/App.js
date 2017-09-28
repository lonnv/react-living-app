import React from 'react';
import WelcomeComponent from './WelcomeComponent'
import CurrentCostOfLivingComponent from './CurrentCostOfLivingComponent'
import CityDropDownComponent from './CityDropDownComponent'
import NewCostOfLivingComponent from './NewCostOfLivingComponent'

class App extends React.Component {

  state = {
    step: 1,
    currentCostOfLiving: '',
    currencyType: 'USD',
    currentCity: '',
    newCity: '',
    newCitySlug: '',
    exactNewCostOfLivingValue: 0,
    newCostOfLiving: 0,
    percentChanges: {},
    refreshCity: false
  };

  handleCurrentCostOfLivingInput = (e) => {
    this.setState({
      currentCostOfLiving: e.target.value
    });
  }

  handleCurrencyType = (e) => {
    this.setState({
      currencyType: e.target.value
    })
  }

  handleCurrentCity = (e) => {
    let currencyType;
    const dataSet = require('../data/cost_of_living_indices.json');

    if (e !== undefined) {
      currencyType = dataSet[e].currency_type;
    }

    this.setState({
      currentCity: e,
      currencyType: currencyType
    });
  }

  handleNewCity = (e) => {
    this.setState({
      newCity: e
    });
  }

  handleRefreshCity = (e) => {
    this.setState({
      newCity: e,
      refreshCity: true
    },
    function () {
      this.calculateNewCostOfLivingAndNextStep();

      this.setState({
        refreshComponent: !(this.state.refreshComponent)
      });
    });
  }

  calculateNewCostOfLivingAndNextStep = () => {
    let newCostOfLiving
    const currentCostOfLiving = Number(this.state.currentCostOfLiving);
    const currentCity = this.state.currentCity;
    const newCity = this.state.newCity;
    const dataSet = require('../data/cost_of_living_indices.json');
    
    if (dataSet[newCity].index !== dataSet[currentCity].index) {
      let fractionalChange = ((dataSet[newCity].index - dataSet[currentCity].index)/dataSet[currentCity].index);
      newCostOfLiving = (currentCostOfLiving + (currentCostOfLiving * fractionalChange));
    } else {
      newCostOfLiving = currentCostOfLiving;
    }

    this.setState({
      newCitySlug: dataSet[newCity].slug,
      exactNewCostOfLivingValue: newCostOfLiving,
      newCostOfLiving: (Math.round(newCostOfLiving/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });

    if (!this.state.refreshCity) {
      this.nextStep();
    }
  }

  changeCurrencyTypeAndValue = (exactValue, value, newCurrencyType) => {
    this.setState({
      exactNewCostOfLivingValue: exactValue,
      newCostOfLiving: value,
      currencyType: newCurrencyType
    })
  }

  nextStep = () => {
    this.setState({
      step: this.state.step + 1 
    });
  }

  previousStep = () => {
    this.setState({
      step: this.state.step > 2
        ? this.state.step - 1
        : 1
    });
  }

  resetToFirstStep = () => {
    this.setState({
      step: 1,
      currentCostOfLiving: '',
      currencyType: 'USD',
      currentCity: '',
      newCity: '',
      newCitySlug: '',
      exactNewCostOfLivingValue: 0,
      newCostOfLiving: 0,
      refreshCity: false
    })
  }

  render () {
    switch (this.state.step) {
      case 1:
        return <WelcomeComponent nextStep={this.nextStep} />
      case 2:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.currentCity}
                      currencyType={this.state.currencyType} 
                      onChange={this.handleCurrentCity}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep} />
      case 3:
        return <CurrentCostOfLivingComponent value={this.state.currentCostOfLiving} 
                      currencyValue={this.state.currencyType}
                      onChange={this.handleCurrentCostOfLivingInput} 
                      onChangeOfCurrencyType={this.handleCurrencyType}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      resetToFirstStep={this.resetToFirstStep} />
      case 4:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.newCity} 
                      onChange={this.handleNewCity}
                      nextStep={this.calculateNewCostOfLivingAndNextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep} />
      case 5:
        return <NewCostOfLivingComponent key={this.state.refreshComponent}
                      value={this.state.newCostOfLiving}
                      exactNewCostOfLivingValue={this.state.exactNewCostOfLivingValue}
                      currentCostOfLiving={this.state.currentCostOfLiving}
                      currentCity={this.state.currentCity}
                      newCity={this.state.newCity}
                      newCitySlug={this.state.newCitySlug}
                      currencyType={this.state.currencyType}
                      resetToFirstStep={this.resetToFirstStep}
                      changeCurrencyTypeAndValue={this.changeCurrencyTypeAndValue}
                      handleNewCityFunction={this.handleNewCity}
                      handleRefreshCityFunction={this.handleRefreshCity} />
      default:
        return null;
    }
  }
}

export default App;
