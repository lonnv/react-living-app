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
class RandomPosition extends React.component {
  constructor(props){
    super(props);
    this.state ={
      listOfSalaries: '',
      position: '',
      salary: ''
    }
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
          in {this.props.newCity} is around <span className='random-salary'>{this.state.targetCurrency} {this.state.salary}</span></p>
        </div>
      </div>
    )
  }
}

export default RandomPosition;