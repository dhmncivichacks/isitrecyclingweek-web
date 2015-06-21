import React from 'react';
import useSheet from '../react-jss';

const styles = {
	header: {
		fontWeight: 300,
		minHeight: '4em'
	}
};

@useSheet(styles)
export default class Header extends React.Component {
	static propTypes = {
		sheet: React.PropTypes.object
	}
	render() {
		return (
			<h1 className={this.props.sheet.classes.header}>
				{this.props.children}
			</h1>
		);
	}
}
