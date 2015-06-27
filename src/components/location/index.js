import React, {PropTypes} from 'react';
import IconButton from '../icon-button';

export default class Location extends React.Component {
	static propTypes = {
		onFetchLocation: PropTypes.func
	}
	constructor (...args) {
		super(...args);
		this.state = {
			loading: false
		};
	}
	handleClick () {
		this.setState({ loading: true });
		this.props.onFetchLocation().then(() => {
			this.setState({ loading: false });
		});
	}
	render () {
		return (
			<IconButton onClick={this.handleClick.bind(this)} label="Use Current Location" secondary={true} disabled={this.state.loading} icon="fa-map-marker" />
		);
	}
}
