import React from 'react';
import Location from './location';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Is it recycling day?</h1>
				<Location />
			</div>
		);
	}
}