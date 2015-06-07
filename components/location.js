import React from 'react';

export default class Location extends React.Component {
	render () {
		return (
			<button onClick={this.props.onFetch}>Use Current Location</button>
		);
	}
}