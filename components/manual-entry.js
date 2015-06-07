import React from 'react';

export default class ManualEntry extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			userInput: null
		};
	}
	handleInputChange (event) {
		this.setState({ userInput: event.target.value });
	}
	handleSubmit (event) {
		console.time('submit address lookup');
		event.preventDefault();
		this.props.onLookup(this.state.userInput);
		console.timeEnd('submit address lookup');
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				Enter address: <input type="text" onChange={this.handleInputChange.bind(this)} />
				<button type="submit">Lookup</button>
			</form>
		);
	}
}