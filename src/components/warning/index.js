import React, {PropTypes} from 'react';
import { red600 } from 'material-ui/styles/colors';

export default class Warning extends React.Component {
	static propTypes = {
		error: PropTypes.string
	}
	render() {
		return (
			<p style={{ color: red600 }}>
				<strong>{ this.props.error }</strong>
			</p>
		);
	}
}
