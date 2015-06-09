import React from 'react';
import Ladda from 'react-ladda';

export default class Location extends React.Component {
	constructor (...args) {
		super(...args);
		this.state = {
			loading: false
		};
	}
	handleClick () {
		this.setState({ loading: true });
		this.props.onFetch().then(() => {
			this.setState({ loading: false });
		});
	}
	render () {
		return (
			<Ladda active={this.state.loading} style="expand-right">
				<button onClick={this.handleClick.bind(this)}>Use Current Location</button>
			</Ladda>
		);
	}
}