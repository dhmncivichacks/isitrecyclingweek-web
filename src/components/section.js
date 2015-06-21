import React from 'react';
import useSheet from '../react-jss';

const styles = {
	section: {
		maxWidth: '40em',
		margin: '0 auto',
		padding: '1em',
		textAlign: 'center'
	}
};

@useSheet(styles)
export default class Section extends React.Component {
	render() {
		return (
			<section className={this.props.sheet.classes.section}>
				{this.props.children}
			</section>
		);
	}
}
