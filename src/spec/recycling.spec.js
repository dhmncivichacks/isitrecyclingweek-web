/*eslint-env jasmine */
import ReactDOMServer from 'react-dom/server';
import utils from './utils';
import Recycling from '../components/recycling';

describe('Recycling component', () => {
	it('should show initial state', () => {
		let el = utils.createElement(Recycling);
		expect(ReactDOMServer.renderToStaticMarkup(el)).toMatch('Is it Recycling</span>?');
	});
	it('should show recycle date this week', () => {
		let el = utils.createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: true
			}
		});
		expect(ReactDOMServer.renderToStaticMarkup(el)).toMatch('Thursday this week');
	});
	it('should show recycle date next week', () => {
		let el = utils.createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			}
		});
		expect(ReactDOMServer.renderToStaticMarkup(el)).toMatch('Thursday next week');
	});
	it('should show is recycling message', () => {
		let el = utils.createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			},
			isRecycling: true
		});
		expect(ReactDOMServer.renderToStaticMarkup(el)).toMatch('Yes! Take out the recycling!');
	});
	it('should show is not recycling message', () => {
		let el = utils.createElement(Recycling, {
			garbageDay: {
				label: 'Thursday',
				isThisWeek: false
			},
			isRecycling: false
		});
		expect(ReactDOMServer.renderToStaticMarkup(el)).toMatch('No, you can relax');
	});
});
