import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import cx from 'classnames';
import classes from './style.css';

export default class IconButton extends React.Component {
	render () {
		let {icon, className, ...props} = this.props;
		return (
			<FlatButton {...props} className={ cx(className, classes.button) }>
				<FontIcon className={cx('fa', this.props.icon, classes.icon)} />
			</FlatButton>
		);
	}
}
