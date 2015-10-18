import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import App from './components/app';
import promise from 'es6-promise';

promise.polyfill();

ReactDOM.render(<App />, document.getElementById('app'));
