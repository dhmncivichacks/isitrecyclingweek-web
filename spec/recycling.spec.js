/*eslint-env jasmine */
import React from 'react/addons';
import Recycling from '../src/components/recycling.js';
import {createElement} from './utils';

describe('Recycling component', () => {
	it('should show initial state', () => {
		let el = createElement(Recycling);
		expect(React.renderToStaticMarkup(el)).toMatch('Is it Recycling</span>?');
	});
	it('should show recycle date this week', () => {
		let el = createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: true
			}
		});
		expect(React.renderToStaticMarkup(el)).toMatch('Thursday this week');
	});
	it('should show recycle date next week', () => {
		let el = createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			}
		});
		expect(React.renderToStaticMarkup(el)).toMatch('Thursday next week');
	});
	it('should show is recycling message', () => {
		let el = createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			},
			isRecycling: true
		});
		expect(React.renderToStaticMarkup(el)).toMatch('Yes! Take out the recycling!');
	});
	it('should show is not recycling message', () => {
		let el = createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			},
			isRecycling: false
		});
		expect(React.renderToStaticMarkup(el)).toMatch('No, you can relax');
	});
});
