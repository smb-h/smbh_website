import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.css';
import App from './components/App/App.jsx';
import registerServiceWorker from './config/registerServiceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
