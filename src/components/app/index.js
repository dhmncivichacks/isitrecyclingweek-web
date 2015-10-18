import React from 'react';
import Loader from '../loader';
import Warning from '../warning';
import Recycling from '../recycling';
import ManualEntry from '../manual-entry';
import Header from '../header';
import Panel from '../panel';
import Section from '../section';
import About from '../about';
import createApi from '../../api';
import log from '../../log';

const api = createApi({
	fetch: fetch.bind(window),
	geolocation: navigator.geolocation
});

class App extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			providedAddress: null,
			loading: false,
			error: null,
			recycling: {}
		};
	}
	handleFetchLocation () {
		this.setState({ loading: true, error: null, recycling: {} });
		return api.getCurrentCoordinates()
			.then((coordinates) => api.reverseGeocode(coordinates))
			.then(geocodeAddress => {
				let address = geocodeAddress[0].formatted_address;
				this.setState({
					providedAddress: address
				});
				return address;
			});
	}
	handleAddressLookup (address) {
		this.setState({ loading: true, error: null, recycling: {} });
		return api.getEndpoint(address)
			.then(api.getRecyclePickup.bind(api, address))
			.then(pickup => {
				let garbageDate = api.getNextGarbageDate(pickup);
				this.setState({
					recycling: {
						isRecycling: api.isRecyclingWeek(pickup, garbageDate),
						garbageDay: {
							label: garbageDate.format('dddd'),
							isThisWeek: api.isDateInCurrentWeek(garbageDate.toDate())
						}
					}
				});
			})
			.catch(err => {
				this.setState({
					error: err.message
				});
				log(err);
			})
			.then(() => {
				this.setState({ loading: false });
			});
	}
	render () {
		return (
			<div>
				<Loader loading={this.state.loading} />
				<Section>
					<Header>
						<Recycling {...this.state.recycling} />
						<Warning error={this.state.error} />
					</Header>
					<Panel>
						<ManualEntry onLookup={this.handleAddressLookup.bind(this)} onFetchLocation={this.handleFetchLocation.bind(this)} />
					</Panel>
				</Section>
				<About />
			</div>
		);
	}
}

export default App;
