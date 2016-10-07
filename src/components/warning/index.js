import React, {PropTypes} from 'react';
import { red600 } from 'material-ui/styles/colors';

const Warning = (props) => (
	<p style={{ color: red600 }}>
		<strong>{ props.error }</strong>
	</p>
);

Warning.propTypes = {
	error: PropTypes.string
};

export default Warning;

