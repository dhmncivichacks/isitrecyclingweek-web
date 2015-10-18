import React from 'react';
import proxyquire from 'proxyquire';
let proxyquireStrict = proxyquire.noCallThru();

export default {
	createElement: function(element, props) {
		return React.createElement(element, props);
	},
	mockModuleStyles: function (module) {
		return proxyquireStrict(module, {
			'./style.css': {}
		});
	}
};
