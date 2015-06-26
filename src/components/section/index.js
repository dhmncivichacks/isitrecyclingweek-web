import React from 'react';
import classes from './style.css';

export default class Section extends React.Component {
	render() {
		return (
			<section className={classes.section}>
				{this.props.children}
			</section>
		);
	}
}
