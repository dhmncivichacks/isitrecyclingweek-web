import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FontIcon from 'material-ui/lib/font-icon';
import Styles from 'material-ui/lib/styles';

export default class About extends React.Component {

	show(event) {
		event.preventDefault();
		this.refs.dialog.show();
	}

	hide(event) {
		event.preventDefault();
		this.refs.dialog.dismiss();
	}

	render() {
		return (
			<div>
				<a href="" onClick={this.show.bind(this)} style={{ position: 'absolute', bottom: 5, right: 5, color: Styles.Colors.grey800 }}>
					<FontIcon className="fa fa-question-circle" />
				</a>
				<Dialog
					open={this.props.visible}
					ref="dialog"
					title="About"
					actions={[{ text: 'Close', onClick: this.hide.bind(this) }]}
					modal={false}>

					<p>This was created as part of the first <a href="http://dhmncivichacks.blogspot.com/">DHMN Civic Hackathon</a>!</p>

					<p>It uses the <a href="#">AppletonAPI</a> to look up property information and tell you whether the next garbage day is also recycling day! Inspired by the Android app <a href="https://github.com/dhmncivichacks/isitrecyclingweek">Is it recycling week?</a></p>

					<p>Built with ReactJS. <a href="https://github.com/dhmncivichacks/isitrecycling">View the source</a>, Luke.</p>

				</Dialog>
			</div>
		);
	}

}
