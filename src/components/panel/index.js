import React from 'react';
import Paper from 'material-ui/Paper';
import classes from './style.css';

export default class Panel extends React.Component {
	render () {
		return (
			<Paper zDepth={1} className={classes.panel}>
				{this.props.children}
			</Paper>
		);
	}
}
