import React from 'react';
import Spinner from 'react-spinkit';
import Location from './location';
import Recycling from './recycling';
import ManualEntry from './manual-entry';

import api from '../api';

export default class App extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			providedAddress: null,
			address: null,
			loading: false,
			error: false,
			userInput: null,
			isRecycling: null,
			nextGarbageDay: null
		};
	}
	handleFetchLocation () {
		this.setState({ loading: true, error: false });
		let promise = api.getCurrentCoordinates()
			.then((coordinates) => api.reverseGeocode(coordinates))
			.then(geocodeAddress => {
				let {formatted_address} = geocodeAddress[0];
				this.setState({
					providedAddress: formatted_address
				});
				return api.parseAddress(formatted_address);
			})
			.then(address => {
				return api.getProperties(address);
			});

		return this.processProperties(promise);
	}
	handleAddressLookup (address) {
		this.setState({ loading: true, error: false });
		let parsedAddress = api.parseAddress(address);
		let promise = api.getProperties(parsedAddress);
		return this.processProperties(promise);
	}
	processProperties (promise) {
		return promise
			.then(properties => {
				let [id] = properties[0];
				return api.getProperty(id);
			})
			.then(property => {
				this.setState({
					isRecycling: api.isRecyclingDay(property),
					nextGarbageDay: api.getNextGarbageDay(property),
					providedAddress: api.getPropertyAddress(property)
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
	renderLoader () {
		return (
			<Spinner spinnerName="circle" noFadeIn />
		);
	}
	render () {
		let loading = (this.state.loading)? this.renderLoader() : null;
		return (
			<div>
				<h1>Is it Recycling?</h1>
				{ this.state.error }
				<Recycling garbageDay={this.state.nextGarbageDay} isRecycling={this.state.isRecycling} />
				<div>Your address: { this.state.providedAddress }</div>
				{ loading }
				<ManualEntry onLookup={this.handleAddressLookup.bind(this)} />
				<Location onFetch={this.handleFetchLocation.bind(this)} />
			</div>
		);
	}
}