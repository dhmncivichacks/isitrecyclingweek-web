import React, {PropTypes} from 'react';
import Styles from 'material-ui/lib/styles';

export default class Warning extends React.Component {
	static propTypes = {
		error: PropTypes.string
	}
	render() {
		return (
			<p style={{ color: Styles.Colors.red600 }}>
				<strong>{ this.props.error }</strong>
			</p>
		);
	}
}
