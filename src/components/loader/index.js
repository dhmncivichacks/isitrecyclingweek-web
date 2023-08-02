import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
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

