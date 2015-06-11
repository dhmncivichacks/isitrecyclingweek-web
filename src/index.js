import React from 'react';
import App from './components/app';
import promise from 'es6-promise';

promise.polyfill();

React.render(<App />, document.getElementById('app'));
