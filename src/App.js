import React, { Component } from 'react'; 
import './App.css';
 
import Feedback from './components/Feedback/Feedback'; 

import Particles from 'react-particles-js';
 

//this is originally part of Particles, moved it to it's own obj to make it look cleaner
const particlesOptions = {
		particles: {
			number: {
				value: 40,
				density: {
					enable: true,
					value_area: 800
				}
			}
		}
	  };
  
class App extends Component {
	  
  render() {
    return ( 
      <div className="App"> 
		<Particles className='particles'
				   params={particlesOptions} />
		 
		<Feedback loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
      </div>
    );
  }
}

export default App;
