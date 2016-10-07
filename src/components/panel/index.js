import React from 'react';
import Paper from 'material-ui/Paper';
import classes from './style.css';

export default (props) => (
	<Paper zDepth={1} className={classes.panel}>
		{props.children}
	</Paper>
);

