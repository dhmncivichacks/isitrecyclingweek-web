import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import cx from 'classnames';
import classes from './style.css';

const IconButton = (props) => {
	let {icon, className, ...other} = props;
	return (
		<Button {...other} className={ cx(className, classes.button) }>
			<Icon className={cx('fa', icon, classes.icon)} />
		</Button>
	);
};

IconButton.propTypes = {
	icon: PropTypes.string
};

export default IconButton;

