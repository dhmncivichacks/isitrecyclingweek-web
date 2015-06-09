import React from 'react';
import Location from './location';
import Recycling from './recycling';
import ManualEntry from './manual-entry';

import createApi from '../api';

import style from '../style.css';

const api = createApi({
	fetch: fetch.bind(window),
	geolocation: navigator.geolocation
});

export default class App extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			providedAddress: null,
			address: null,
			loading: false,
			error: false,
			recycling: {}
		};
	}
	handleFetchLocation () {
		this.setState({ loading: true, error: false, recycling: {} });
		let promise = api.getCurrentCoordinates()
			.then((coordinates) => api.reverseGeocode(coordinates))
			.then(geocodeAddress => {
				let {formatted_address} = geocodeAddress[0];
				this.setState({
					providedAddress: formatted_address
				});
				return formatted_address;
			})
			.then(address => {
				return api.getProperties(address);
			});

		return this.processProperties(promise);
	}
	handleAddressLookup (address) {
		this.setState({ loading: true, error: false, recycling: {} });
		let promise = api.getProperties(address);
		return this.processProperties(promise);
	}
	processProperties (promise) {
		return promise
			.then(properties => {
				let [id] = properties[0];
				return api.getProperty(id);
			})
			.then(property => {
				let garbageDate = api.getNextGarbageDate(property);
				this.setState({
					recycling: {
						isRecycling: api.isRecyclingWeek(property, garbageDate),
						garbageDay: {
							label: garbageDate.format('dddd'),
							isThisWeek: api.isDateInCurrentWeek(garbageDate.toDate())
						}
					},
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
	render () {
		return (
			<div>
				<h1>Is it Recycling?</h1>
				{ this.state.error }
				<Recycling {...this.state.recycling} />
				<div>Your address: { this.state.providedAddress }</div>
				<ManualEntry onLookup={this.handleAddressLookup.bind(this)} />
				<Location onFetch={this.handleFetchLocation.bind(this)} />
			</div>
		);
	}
}