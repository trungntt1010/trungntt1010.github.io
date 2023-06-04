import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Provider store={store}>
   
    <App />
   
   
  </Provider>, document.getElementById('root'));

