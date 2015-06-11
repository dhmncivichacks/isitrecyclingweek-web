import React from 'react';
import {Paper} from 'material-ui';

export default class Panel extends React.Component {
	render () {
		return (
			<Paper zDepth={1} style={{ padding: '1em' }}>{this.props.children}</Paper>
		);
	}
}
