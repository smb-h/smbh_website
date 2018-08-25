import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.css';
import App from './components/App/App';
import registerServiceWorker from './config/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('reactify'));
registerServiceWorker();
