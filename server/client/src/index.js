import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Dev-only axios helpers!
import axios from 'axios';
window.axios = axios;

//ARGS for initializing our store: Reducers, initial state, middlewares
const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); 

ReactDOM.render(
    //The provider tag is a react component that knows how to read from the redux store - App is a child component, meaning all of it's children will be informed when the stored state has been updated
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')); //Using this HTML-like syntax to load in our root component! Then, we reach into index.html in public and make a reference to the 'root' class - letting the program identify it for what it is

