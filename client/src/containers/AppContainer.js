import React, { Component } from 'react';
import { Router } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { history } from '../history/history';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import Chats from '../components/Chats/Chats';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import AuthContainer from './AuthContainer';
import Protected from '../components/Protected/Protected';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router history={history}>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							path="/chat"
							render={() => {
								var self = this;
								return Protected(self.props, <Chats />, '/auth/login', true);
							}}
						/>} />
						<Route path="/auth" component={AuthContainer} />
						<Route path="/:params" component={PageNotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(AppContainer);
