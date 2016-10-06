import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import App from './components/app';
import promise from 'es6-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';

promise.polyfill();
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
