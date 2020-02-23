import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';

ReactDOM.render(
    <App />, document.getElementById('root'));
registerServiceWorker();

export {default as ForgotPW} from './components/ForgotPW';
