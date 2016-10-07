import React from 'react';
import classes from './style.css';

export default (props) => (
	<h1 className={classes.header}>
		{props.children}
	</h1>
);
