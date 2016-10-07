import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import cx from 'classnames';
import classes from './style.css';

const IconButton = (props) => {
	let {icon, className, ...other} = props;
	return (
		<FlatButton {...other} className={ cx(className, classes.button) }>
			<FontIcon className={cx('fa', icon, classes.icon)} />
		</FlatButton>
	);
};

IconButton.propTypes = {
	icon: PropTypes.string
};

export default IconButton;

