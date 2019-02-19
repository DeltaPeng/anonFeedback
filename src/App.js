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

const initialState = {	
		input: '',
		imageUrl: '',
		box: {},
		route: 'signin',
		isSignedIn: false,
		user: {
				id:'',
				name:'',
				email: '', 
				entries: 0,
				joined: ''
		}
}
	  
class App extends Component {
	
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
					id:'',
					name:'',
					email: '', 
					entries: 0,
					joined: ''
			}
		};
	}
	
	//create function for use in Register.js, loads a user into the state.  Need to pass into Register
	loadUser = (userData) => {
		this.setState( {user: {
			id: userData.id,
			name:userData.name,
			email: userData.email, 
			entries: userData.entries,
			joined: userData.joined
			}
		})
	}
	
	//way to get/fetch data from server, should return the root item of the SmartBrainAPI, which'll return the users
	//componentDidMount() {
	//	fetch('http://localhost:3000/')
	//	 .then(response => response.json())
	//	 .then(console.log) //shorthand, logs the response.json
	//}
	 
	//events
	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({input: event.target.value});
	}
	 
	onRouteChange = ( newRoute) => {
		if ( newRoute === 'signin') {
			this.setState(initialState);
		} else if ( newRoute === 'home') {
			this.setState({isSignedIn: true});
		} 
		
		this.setState({route: newRoute});
	} 
	
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
