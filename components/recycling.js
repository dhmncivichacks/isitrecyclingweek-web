import React from 'react';
import api from '../api';

export default class Recycling extends React.Component {
	render () {
		let {garbageDay} = this.props;
		if (!garbageDay) {
			return null;
		}
		let weekLabel = 'this week';
		if (!this.props.isNextGarbageDayThisWeek) {
			weekLabel = 'next week';
		}
		return (
			<div>Is it recycling { weekLabel } { garbageDay }? { this.props.isRecycling? 'yes': 'no' }</div>
		);
	}
}