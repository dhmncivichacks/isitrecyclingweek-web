import React, {PropTypes} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import classes from './style.css';

export default class Loader extends React.Component {
	static propTypes = {
		loading: PropTypes.bool
	}
	render() {
		return (
			<div className={classes.loader}>
				{ this.props.loading ?
				<LinearProgress mode="indeterminate" /> : null }
			</div>
		);
	}
}
