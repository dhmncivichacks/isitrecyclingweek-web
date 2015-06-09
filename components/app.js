import React from 'react';
import Recycling from './recycling';
import ManualEntry from './manual-entry';
import Panel from './panel';
import mui from 'material-ui';
import createApi from '../api';
import style from '../style.css';

let {LinearProgress, Paper} = mui;
let ThemeManager = new mui.Styles.ThemeManager();

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
				let {formatted_address} = geocodeAddress[0];
				this.setState({
					providedAddress: formatted_address
				});
				return formatted_address;
			});
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
	getChildContext() { 
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	}
	render () {
		return (
			<div>
				<div style={{ minHeight: 5 }}>
					{ this.state.loading?
					<LinearProgress mode="indeterminate" /> : null }
				</div>
				<section className="container">
					<h1 style={{ fontWeight: 300, minHeight: '4em' }}>
						<Recycling {...this.state.recycling} />
						<p>
							<strong style={{ color: mui.Styles.Colors.red600 }}>{ this.state.error }</strong>
						</p>
					</h1>
					<Panel>
						<ManualEntry onLookup={this.handleAddressLookup.bind(this)} onFetchLocation={this.handleFetchLocation.bind(this)} />
					</Panel>
				</section>
			</div>
		);
	}
}
App.childContextTypes = {
	muiTheme: React.PropTypes.object
};