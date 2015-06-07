import React from 'react';
import Spinner from 'react-spinkit';
import api from '../api';
import moment from 'moment';

export default class App extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
			location: 'Unknown',
			loading: false,
			error: false,
			userInput: null,
			isRecycling: null,
			nextGarbageDay: null
		};
	}
	handleFetchLocationClick() {
		this.setState({ loading: true, error: false });
		let promise = api.getCurrentCoordinates()
			.then((coordinates) => api.reverseGeocode(coordinates))
			.then(geocodeAddress => {
				let {formatted_address} = geocodeAddress[0];
				this.setState({
					location: formatted_address
				});
				return api.parseAddress(formatted_address);
			})
			.then(address => {
				return api.getProperties(address);
			});

		return this.processProperties(promise);
	}
	handleLookupClick() {
		this.setState({ loading: true, error: false });
		let address = api.parseAddress(this.state.userInput);
		let promise = api.getProperties(address);
		return this.processProperties(promise);
	}
	handleInputChange(event) {
		this.setState({ userInput: event.target.value });
	}
	processProperties(promise) {
		return promise
			.then(properties => {
				let [id] = properties[0];
				return api.getProperty(id);
			})
			.then(property => {
				this.setState({
					isRecycling: api.isRecyclingDay(property),
					nextGarbageDay: api.getNextGarbageDay(property)
				});
			})
			.catch(err => {
				this.setState({
					error: err.message
				});
				console.info(err);
			})
			.then(() => {
				this.setState({ loading: false });
			});
	}
	renderError(error) {
		return (
			<div>
				<div>{ error }</div>
				<div>
					Enter address: <input type="text" onChange={this.handleInputChange.bind(this)} />
					<button onClick={this.handleLookupClick.bind(this)}>Lookup</button>
				</div>
			</div>
		);
	}
	renderLoader() {
		return (
			<Spinner spinnerName="circle" noFadeIn />
		);
	}
	renderRecycling(isRecycling, garbageDay) {
		return (
			<div>Is it recycling { garbageDay }? { isRecycling? 'yes': 'no' }</div>
		);
	}
	render() {
		let loading = (this.state.loading)? this.renderLoader() : null;
		let error = (this.state.error)? this.renderError(this.state.error) : null;
		let recycling = this.renderRecycling(this.state.isRecycling, this.state.nextGarbageDay);
		return (
			<div>
				<div>Your address: { this.state.location }</div>
				{ loading }
				{ error }
				{ recycling }
				<button onClick={this.handleFetchLocationClick.bind(this)}>Check Current Location</button>
			</div>
		);
	}
}