import React from 'react';
import {FlatButton, TextField, FontIcon} from 'material-ui';
import Location from './location';

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
		if (event) { event.preventDefault(); }
		return this.props.onLookup(this.state.userInput).then(() => {
			this.setState({ loading: false });
		});
	}
	handleFetchLocation () {
		this.setState({ loading: true });
		return this.props.onFetchLocation().then(address => {
			this.setState({ userInput: address });
			return this.handleSubmit();
		});
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<FontIcon className="fa fa-search" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
				<TextField hintText="Enter Address" onChange={this.handleInputChange.bind(this)} value={this.state.userInput} />
				<FlatButton primary={true} type="submit" disabled={this.state.loading} label="Search" style={{ margin: '0 5px' }} />
				<Location onFetchLocation={this.handleFetchLocation.bind(this)} />
			</form>
		);
	}
}
