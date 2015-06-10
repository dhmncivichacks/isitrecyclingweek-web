import React from 'react';
import IconButton from './icon-button';

export default class Location extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			loading: false
		};
	}
	handleClick () {
		this.setState({ loading: true });
		this.props.onFetchLocation().then(() => {
			this.setState({ loading: false });
		});
	}
	render () {
		return (
			<IconButton onClick={this.handleClick.bind(this)} label="Use Current Location" primary={true} disabled={this.state.loading} icon="fa-map-marker" />
		);
	}
}
