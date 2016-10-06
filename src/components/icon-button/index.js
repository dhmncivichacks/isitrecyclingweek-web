import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import cx from 'classnames';
import classes from './style.css';

export default class IconButton extends React.Component {
	static propTypes = {
		icon: PropTypes.string
	}
	render () {
		let {icon, className, ...props} = this.props;
		return (
			<FlatButton {...props} className={ cx(className, classes.button) }>
				<FontIcon className={cx('fa', icon, classes.icon)} />
			</FlatButton>
		);
	}
}
