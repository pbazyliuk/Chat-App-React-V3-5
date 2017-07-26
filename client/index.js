// Libs

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import defaultReducer from './src/reducers/index';
import { reducer as formReducer } from 'redux-form';
import rootReducer from './src/reducers/';

import { AUTH_USER, GET_MESSAGES } from './src/actionsTypes/index';

import AppContainer from './src/containers/AppContainer';

import './style.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const token = localStorage.getItem('token');

const store = createStoreWithMiddleware(rootReducer);

if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
