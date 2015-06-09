import React from 'react';
import api from '../api';

export default class Recycling extends React.Component {
	render () {
		if (!this.props.garbageDate) {
			return null;
		}
		let {garbageDate} = this.props;
		let dayLabel = garbageDate.format('dddd');
		let weekLabel = 'this week';
		if (!this.props.isNextGarbageDayThisWeek) {
			weekLabel = 'next week';
		}
		return (
			<div>Is it recycling { weekLabel } { dayLabel }? { this.props.isRecycling? 'yes': 'no' }</div>
		);
	}
}