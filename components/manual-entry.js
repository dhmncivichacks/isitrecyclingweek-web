import React from 'react';
import Ladda from 'react-ladda';

export default class ManualEntry extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			userInput: null,
			loading: null
		};
	}
	handleInputChange (event) {
		this.setState({ userInput: event.target.value });
	}
	handleSubmit (event) {
		this.setState({ loading: true });
		event.preventDefault();
		this.props.onLookup(this.state.userInput).then(() => {
			this.setState({ loading: false });
		});
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				Enter address: <input type="text" onChange={this.handleInputChange.bind(this)} />
				<Ladda active={this.state.loading} style="expand-right">
					<button type="submit">Lookup</button>
				</Ladda>
			</form>
		);
	}
}