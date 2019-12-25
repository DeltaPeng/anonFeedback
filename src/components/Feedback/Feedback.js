//EDIT HISTORY:
// 190218 TSN - created app
//
import React from 'react';

//where statusFlag, 0 = no submit, 1 = processing, 2 = completed	 
class Feedback extends React.Component {

	//set up contructor with props and state
	constructor(props) {
		super(props);
		this.state = {
			feedbackKey: '',
			feedbackLiked: '',
			feedbackFuture: '',
			feedbackMisc: '',
			statusFlag: '0',
			statusMsg: ''
		}
	}

	//create some events to update state based on change value of fields
	onFBKeyChange = (event) => {
		this.setState({ feedbackKey: event.target.value.trim() })
	}
	onFBLikedChange = (event) => {
		this.setState({ feedbackLiked: event.target.value.trim() })
	}
	onFBFutureChange = (event) => {
		this.setState({ feedbackFuture: event.target.value.trim() })
	}
	onFBMiscChange = (event) => {
		this.setState({ feedbackMisc: event.target.value.trim() })
	}

	//create an event to send data on submit
	onSubmitSignIn = () => {
		//reset error msg
		//mark as in progress
		this.setState({ statusFlag: '1' })
		//this.setState({ statusMsg: 'Processing...'})

		//use js's inane process to get date
		var d = new Date();
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var month = (d.getMonth() + 1); //month starts at 0...
		if (month < 10) {
			month = '0' + month;
		}
		var day = d.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		var todayDate = d.getFullYear() + '/' + month + '/' + day + ' ' + days[d.getDay()];

		//if key is blank or is less than 6 chars, Or if all other three fields are empty, flag
		if (this.state.feedbackKey === '' || this.state.feedbackKey.length < 6) {
			this.setState({ statusFlag: '-1' })
			this.setState({ statusMsg: 'Error, Key field needs to be at least 6 characters long.' })
			return;
		} else if (this.state.feedbackLiked === '' && this.state.feedbackFuture === '' && this.state.feedbackMisc === '') {
			this.setState({ statusFlag: '-2' })
			this.setState({ statusMsg: 'Error, at least one non-Key field needs data, please try again.' })
			return;
		}

		let btnSubmit0 = document.getElementById('btnSubmit');
		btnSubmit0.disabled = true;

		this.setState({ statusFlag: '-10' })
		this.setState({ statusMsg: 'Processing your request, please wait a minute...' })

		//may want to switch to UTC to expand app capabilities, but then would want a local time converter. 
		// Since we're just getting the day, not as big a deal
		fetch('https://stormy-mesa-91905.herokuapp.com/feedback',
			{
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fbKey: this.state.feedbackKey,
					fbLiked: this.state.feedbackLiked,
					fbFuture: this.state.feedbackFuture,
					fbMisc: this.state.feedbackMisc,
					dayCreated: todayDate
				})
			}
		).then(response => response.json())
			.then(submittedEntry => {
				//this.setState({ statusMsg: submittedEntry})  //debug, ID
				//if we got entry id back, this means it successfully went through
				if (submittedEntry === 'Unable to log entry.') {
					this.setState({ statusFlag: '-3' })
					this.setState({ statusMsg: "an error occurred" })
					btnSubmit0.disabled = false;
				}
				else {
					//completed
					this.setState({ statusFlag: '2' })
					this.setState({ statusMsg: 'Feedback successfully submitted.\nThank you for your thoughts!' })

					let FBKeyChange0 = document.getElementById('FBKeyChange');
					FBKeyChange0.disabled = true;

					let FBLikedChange0 = document.getElementById('FBLikedChange');
					FBLikedChange0.disabled = true;

					let FBFutureChange0 = document.getElementById('FBFutureChange');
					FBFutureChange0.disabled = true;

					let FBMiscChange0 = document.getElementById('FBMiscChange');
					FBMiscChange0.disabled = true;
				}

			})
			.catch(err => {
				this.setState({ statusFlag: '-4' })
				this.setState({ statusMsg: "an error occurred." })
				//this.setState({ statusMsg: err.message})  //for internal debug
				btnSubmit0.disabled = false;
			})
	}

	render() {
		//const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="feedback_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Anonymous Feedback</legend>

							<div className="mt3">
								<label className="db fw6 lh-copy f6">Key of the event:</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									name="FBKeyChange" id="FBKeyChange"
									maxLength="60"
									onChange={this.onFBKeyChange} />
							</div>

							<div className="mt3">
								<label className="db fw6 lh-copy f6">Things you liked about the event:</label>
								<textarea className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 lgTextbox"
									name="FBLikedChange" id="FBLikedChange"
									maxLength="200" spellCheck="false"
									onChange={this.onFBLikedChange} />
							</div>

							<div className="mt3">
								<label className="db fw6 lh-copy f6">Things you would like to see / do on future events:</label>
								<textarea className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 lgTextbox"
									name="FBFutureChange" id="FBFutureChange"
									maxLength="200" spellCheck="false"
									onChange={this.onFBFutureChange} />
							</div>

							<div className="mt3">
								<label className="db fw6 lh-copy f6">Misc comments, suggestions for improvement, etc:</label>
								<textarea className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 lgTextbox"
									name="FBMiscChange" id="FBMiscChange"
									maxLength="200" spellCheck="false"
									onChange={this.onFBMiscChange} />
							</div>

						</fieldset>


						{this.state.statusMsg === ''
							? null
							: <label className="db fw6 lh-copy f6" >{this.state.statusMsg}</label>
						}

						{this.state.statusFlag < 1
							? <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								id="btnSubmit" type="submit"
								value="Press once to submit feedback anonymously"
								onClick={this.onSubmitSignIn}
							/>
							: null
						}
					</div>
				</main>
			</article>
		);
	}
}

export default Feedback;