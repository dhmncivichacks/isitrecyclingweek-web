import React, {PropTypes} from 'react';
import cx from 'classnames';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
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
		return this.props.onFetchLocation().then(address => {
			this.setState({ userInput: address });
			return this.handleSubmit();
		});
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<FontIcon className={ cx('fa', 'fa-search', classes.searchIcon) } />
				<TextField hintText="Enter Address" onChange={this.handleInputChange.bind(this)} value={this.state.userInput} />
				<FlatButton primary={true} type="submit" disabled={this.state.loading} label="Search" className={classes.submitButton} />
				<Location onFetchLocation={this.handleFetchLocation.bind(this)} />
			</form>
		);
	}
}
