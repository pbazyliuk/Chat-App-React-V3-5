import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logout from '../components/Logout/Logout';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Protected from '../components/Protected/Protected';

class AuthContainer extends React.Component {
	constructor(props) {
		super(props);

		this.submitLogin = this.submitLogin.bind(this);
		this.submitRegister = this.submitRegister.bind(this);
		this.submitLogout = this.submitLogout.bind(this);
	}

	submitLogin(values) {
		this.props.loginUser(values);
	}

	submitRegister(values) {
		this.props.registerUser(values);
	}

	submitLogout() {
		this.props.logoutUser();
	}

	render() {
		let { match } = this.props;
		return (
			<div>
				<Route
					exact
					path={match.path}
					render={() => {
						return (
							<div>
								<Redirect from="{match.path}" to="auth/login" />
							</div>
						);
					}}
				/>

				<Route
					path={`${this.props.match.url}/login`}
					render={() => {
						return Protected(
							this.props,
							<Login {...this.props} onSubmit={this.submitLogin} />,
							'/chat',
							false
						);
					}}
				/>
				<Route
					path={`${this.props.match.url}/register`}
					render={() => {
						return Protected(
							this.props,
							<Register {...this.props} onSubmit={this.submitRegister} />,
							'/chat',
							false
						);
					}}
				/>

				<Route
					path={`${this.props.match.url}/logout`}
					render={() => {
						return <Logout logout={this.submitLogout} />;
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	state
});

AuthContainer.propTypes = {
	match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actions)(AuthContainer);
