import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Location from '../location';
import classes from './style.css';

export default class ManualEntry extends React.Component {
	static propTypes = {
		onLookup: PropTypes.func,
		onFetchLocation: PropTypes.func
	}
	constructor (...args) {
		super(...args);
		this.state = {
			userInput: '',
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
		return this.props.onFetchLocation().then(address => {
			this.setState({ userInput: address });
			return this.handleSubmit();
		});
	}
	handleKeyPress (event) {
		if(event.keyCode === 13){
			this.handleSubmit(event);
		}
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>
				<Icon className={ cx('fa', 'fa-search', classes.searchIcon) } />
				<TextField className={classes.input} floatingLabelText="Address" hintText="e.g. Street, City, State Zip" onChange={this.handleInputChange.bind(this)}
				           onKeyPress={this.handleKeyPress.bind(this)} value={this.state.userInput} required />
				<Button primary={true} type="submit" disabled={this.state.loading} label="Search" className={classes.submitButton} />
				<Location onFetchLocation={this.handleFetchLocation.bind(this)} />
			</form>
		);
	}
}
