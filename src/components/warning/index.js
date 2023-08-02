import React from 'react';
import PropTypes from 'prop-types';
import { red } from '@mui/material/colors';

const Warning = (props) => (
	<p style={{ color: red }}>
		<strong>{ props.error }</strong>
	</p>
);

Warning.propTypes = {
	error: PropTypes.string
};

export default Warning;

