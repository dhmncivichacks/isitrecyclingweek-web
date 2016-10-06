import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default {
	createElement: function(element, props) {
		const wrapperWithContext = React.createClass({
			childContextTypes: {
				muiTheme: React.PropTypes.object.isRequired
			},
			getChildContext: function() {
				return {muiTheme: getMuiTheme()};
			},
			render: function() {
				return React.createElement(element, props);
			}
		});
		return React.createElement(wrapperWithContext);
	}
};
