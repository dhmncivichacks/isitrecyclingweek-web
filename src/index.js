import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import App from './components/app';
import promise from 'es6-promise';

promise.polyfill();
//FIXME https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
ReactDOM.render(<App />, document.getElementById('root'));
