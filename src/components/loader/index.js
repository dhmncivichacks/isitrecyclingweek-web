import React, {PropTypes} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import classes from './style.css';

const Loader = (props) => (
	<div className={classes.loader}>
		{ props.loading ?
		<LinearProgress mode="indeterminate" /> : null }
	</div>
);

Loader.propTypes = {
	loading: PropTypes.bool
};

export default Loader;

