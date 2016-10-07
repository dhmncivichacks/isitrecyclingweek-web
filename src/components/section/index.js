import React from 'react';
import classes from './style.css';

export default (props) => (
	<section className={classes.section}>
		{props.children}
	</section>
);
