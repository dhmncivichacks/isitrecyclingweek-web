import React from 'react';
import api from '../api';
import {Styles, FontIcon} from 'material-ui';
import cx from 'classnames';

export default class Recycling extends React.Component {
	renderAnswer (text, color, icon) {

		return (
			<span style={{ color }}>
				{ icon?
					<FontIcon className={cx('fa', icon)} style={{ fontSize: '1em', marginRight: '0.2em' }} /> : null }
				{text}
			</span>
		);
	}
	render () {
		let header = (
			<span>
				<FontIcon className="fa fa-recycle" style={{ color: Styles.Colors.teal500, marginRight: '0.5em' }} />
				Is it Recycling
			</span>
		);
		let {garbageDay, isRecycling} = this.props;
		if (!garbageDay) {
			return <div>{header}?</div>;
		}
		let weekLabel = (garbageDay.isThisWeek)? 'this week' : 'next week';
		let yes = this.renderAnswer('Yes! Take out the recycling!', Styles.Colors.teal500, 'fa-check');
		let no = this.renderAnswer('No, you can relax :)', Styles.Colors.deepPurple500);
		return (
			<div>
				<p>{header} <strong style={{ fontWeight: 500 }}>{ garbageDay.label } { weekLabel }</strong>?</p>
				<p>{ isRecycling? yes : no }</p>
			</div>
		);
	}
}