import React from 'react';
import Recycling from '../components/recycling.js';

xdescribe('Recycling component', () => {
	let expectedMarkup = function(week, day, answer) {
		return `<div>Is it recycling ${week} ${day}? ${answer}</div>`;
	};
	let createElement = function(props) {
		return React.createElement(Recycling, props);
	};
	it('should indicate garbage day', () => {
		let el = createElement({
			garbageDay: {
				label: 'Thursday'
			}
		});
		expect(React.renderToStaticMarkup(el)).toEqual(expectedMarkup('next week', 'Thursday', 'no'));
	});
	it('should indicate if next garbage day is this week', () => {
		let el = createElement({
			garbageDay: {
				label: 'Thursday',
				isThisWeek: true
			}
		});
		expect(React.renderToStaticMarkup(el)).toEqual(expectedMarkup('this week', 'Thursday', 'no'));
	});
	it('should indicate if recycling', () => {
		let el = createElement({
			garbageDay: {
				label: 'Thursday'
			},
			isRecycling: true
		});
		expect(React.renderToStaticMarkup(el)).toEqual(expectedMarkup('next week', 'Thursday', 'yes'));
	});
});