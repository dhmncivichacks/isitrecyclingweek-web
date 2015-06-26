import React from 'react/addons';
import mui from 'material-ui';
import proxyquire from 'proxyquire';
let ThemeManager = new mui.Styles.ThemeManager();
let proxyquireStrict = proxyquire.noCallThru();

export default {
	createElement: function(element, props) {
		let component = React.createFactory(element);
		let wrapper = React.createClass({
			getChildContext: function() {
				return {
					muiTheme: ThemeManager.getCurrentTheme()
				};
			},
			childContextTypes: {
				muiTheme: React.PropTypes.object
			},
			render: function() {
				return component(props);
			}
		});
		return React.createElement(wrapper);
	},
	mockModuleStyles: function (module) {
		return proxyquireStrict(module, {
			'./style.css': {}
		});
	}
};
