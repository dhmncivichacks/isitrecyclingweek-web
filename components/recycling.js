import React from 'react';

export default class Recycling extends React.Component {
	render () {
		if (!this.props.garbageDay) {
			return null;
		}
		return (
			<div>Is it recycling { this.props.garbageDay }? { this.props.isRecycling? 'yes': 'no' }</div>
		);
	}
}