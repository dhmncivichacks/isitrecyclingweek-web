import React from 'react';
import Recycling from './recycling';
import ManualEntry from './manual-entry';
import Panel from './panel';
import About from './about';
import createApi from '../api';
import log from '../log';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LinearProgress from 'material-ui/lib/linear-progress';
import Colors from 'material-ui/lib/styles/colors';
let themeManager = new ThemeManager();

const api = createApi({
	fetch: fetch.bind(window),
	geolocation: navigator.geolocation
});

export default class App extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			providedAddress: null,
			loading: false,
			error: false,
			recycling: {}
		};
	}
	handleFetchLocation () {
		this.setState({ loading: true, error: false, recycling: {} });
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
		this.setState({ loading: true, error: false, recycling: {} });
		return api.getProperties(address)
			.then(properties => {
				let [id] = properties[0];
				log(`${log.house}\n\nYour property id is: ${id}`);
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
				log(err);
			})
			.then(() => {
				this.setState({ loading: false });
			});
	}
	getChildContext() {
		return {
			muiTheme: themeManager.getCurrentTheme()
		};
	}
	render () {
		return (
			<div>
				<div style={{ minHeight: 5 }}>
					{ this.state.loading ?
					<LinearProgress mode="indeterminate" /> : null }
				</div>
				<section style={{ maxWidth: '40em', margin: '0 auto', padding: '1em', textAlign: 'center' }}>
					<h1 style={{ fontWeight: 300, minHeight: '4em' }}>
						<Recycling {...this.state.recycling} />
						<p>
							<strong style={{ color: Colors.red600 }}>{ this.state.error }</strong>
						</p>
					</h1>
					<Panel>
						<ManualEntry onLookup={this.handleAddressLookup.bind(this)} onFetchLocation={this.handleFetchLocation.bind(this)} />
					</Panel>
				</section>
				<About />
			</div>
		);
	}
}
App.childContextTypes = {
	muiTheme: React.PropTypes.object
};
