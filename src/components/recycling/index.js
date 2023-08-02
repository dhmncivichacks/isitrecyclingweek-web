import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { teal, deepPurple } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import classes from './style.css';

export default class Recycling extends React.Component {
	static propTypes = {
		garbageDay: PropTypes.shape({
			isThisWeek: PropTypes.bool,
			label: PropTypes.string
		}),
		isRecycling: PropTypes.bool
	}
	renderAnswer (text, color, icon) {
		return (
			<span style={{ color }}>
				{ icon ?
					<Icon className={cx('fa', icon, classes.answerIcon)} /> : null }
				{text}
			</span>
		);
	}
	render () {
		let header = (
			<span>
				<Icon className={cx('fa', 'fa-recycle', classes.headerIcon)} style={{ color: teal }} />
				Is it Recycling
			</span>
		);
		let {garbageDay, isRecycling} = this.props;
		if (!garbageDay) {
			return <div>{header}?</div>;
		}
		let weekLabel = (garbageDay.isThisWeek) ? 'this week' : 'next week';
		let yes = this.renderAnswer('Yes! Take out the recycling!', teal, 'fa-check');
		let no = this.renderAnswer('No, you can relax :)', deepPurple);
		return (
			<div>
				<p>{header} <strong>{ garbageDay.label } { weekLabel }</strong>?</p>
				<p>{ isRecycling ? yes : no }</p>
			</div>
		);
	}
}
