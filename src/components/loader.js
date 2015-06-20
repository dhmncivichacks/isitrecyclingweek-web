import React, {PropTypes} from 'react';
import useSheet from '../react-jss';
import {LinearProgress} from 'material-ui';

const styles = {
	loader: {
		minHeight: 5
	}
};

@useSheet(styles)
export default class Loader extends React.Component {
	static propTypes = {
		loading: PropTypes.bool
	}
	render() {
		const { classes } = this.props.sheet;
		return (
			<div className={classes.loader}>
				{ this.props.loading ?
				<LinearProgress mode="indeterminate" /> : null }
			</div>
		);
	}
}
