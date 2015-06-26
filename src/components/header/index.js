import React from 'react';
import classes from './style.css';

export default class Header extends React.Component {
	render() {
		return (
			<h1 className={classes.header}>
				{this.props.children}
			</h1>
		);
	}
}
