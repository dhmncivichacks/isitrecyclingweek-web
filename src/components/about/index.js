import React from 'react';
import Dialog from '@mui/material/Dialog';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import classes from './style.css';

export default class About extends React.Component {

	state = {
		open: false
	};

	show(event) {
		event.preventDefault();
		this.setState({ open: true });
	}

	hide(event) {
		event.preventDefault();
		this.setState({ open: false });
	}

	render() {
		let actions = [
			<Button
				label="Close"
				primary={true}
				onTouchTap={this.hide.bind(this)}
			/>
		];
		return (
			<div>
				<a href="" onClick={this.show.bind(this)} className={ classes.aboutLink } style={{ color: grey }}>
					<Icon className="fa fa-question-circle" />
				</a>
				<Dialog
					ref="dialog"
					title="About"
					actions={actions}
					modal={false}
					open={this.state.open}>

					<p>This was created as part of the first <a href="http://dhmncivichacks.blogspot.com/">DHMN Civic Hackathon</a>!</p>

					<p>It uses the <a href="#">AppletonAPI</a> to look up property information and tell you whether the next garbage day is also recycling day! Inspired by the Android app <a href="https://github.com/dhmncivichacks/isitrecyclingweek">Is it recycling week?</a></p>

					<p>Built with ReactJS. <a href="https://github.com/dhmncivichacks/isitrecycling">View the source</a>, Luke.</p>

				</Dialog>
			</div>
		);
	}

}
