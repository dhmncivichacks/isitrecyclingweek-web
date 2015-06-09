import React from 'react';
import api from '../api';

export default class Recycling extends React.Component {
	render () {
		let {garbageDay, isRecycling} = this.props;
		if (!garbageDay) {
			return null;
		}
		let weekLabel = 'this week';
		if (!garbageDay.isThisWeek) {
			weekLabel = 'next week';
		}
		return (
			<div>Is it recycling { weekLabel } { garbageDay.label }? { isRecycling? 'yes': 'no' }</div>
		);
	}
}