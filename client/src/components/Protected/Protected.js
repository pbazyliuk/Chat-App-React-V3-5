import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom';
import Chats from '../Chats/Chats';
import { Map } from 'immutable';

const Protected = (props, Component, url, boolVal) => {
	let isProtected = props.state.auth.get('authenticated');
	if (boolVal) {
		return isProtected === true ? Component : <Redirect to={`${url}`} push />;
	} else {
		return isProtected === true ? <Redirect to={`${url}`} push /> : Component;
	}
};

export default Protected;
