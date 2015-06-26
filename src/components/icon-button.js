import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import cx from 'classnames';

export default class IconButton extends React.Component {
	render () {
		let {icon, ...props} = this.props;
		return (
			<FlatButton {...props} style={{ paddingLeft: '16px' }}>
				<FontIcon className={cx('fa', this.props.icon)} style={{ float: 'left', marginTop: 5 }} />
			</FlatButton>
		);
	}
}
