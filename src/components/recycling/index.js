import React, {PropTypes} from 'react';
import cx from 'classnames';
import { teal500, deepPurple500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
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
					<FontIcon className={cx('fa', icon, classes.answerIcon)} /> : null }
				{text}
			</span>
		);
	}
	render () {
		let header = (
			<span>
				<FontIcon className={cx('fa', 'fa-recycle', classes.headerIcon)} style={{ color: teal500 }} />
				Is it Recycling
			</span>
		);
		let {garbageDay, isRecycling} = this.props;
		if (!garbageDay) {
			return <div>{header}?</div>;
		}
		let weekLabel = (garbageDay.isThisWeek) ? 'this week' : 'next week';
		let yes = this.renderAnswer('Yes! Take out the recycling!', teal500, 'fa-check');
		let no = this.renderAnswer('No, you can relax :)', deepPurple500);
		return (
			<div>
				<p>{header} <strong>{ garbageDay.label } { weekLabel }</strong>?</p>
				<p>{ isRecycling ? yes : no }</p>
			</div>
		);
	}
}
