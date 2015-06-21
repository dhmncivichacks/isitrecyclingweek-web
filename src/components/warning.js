import React, {PropTypes} from 'react';
import {Styles} from 'material-ui';
import useSheet from '../react-jss';

const styles = {
	container: {
		color: Styles.Colors.red600
	}
};

@useSheet(styles)
export default class Warning extends React.Component {
	static propTypes = {
		error: PropTypes.string
	}
	render() {
		return (
			<p className={this.props.sheet.classes.container}>
				<strong>{ this.props.error }</strong>
			</p>
		);
	}
}
