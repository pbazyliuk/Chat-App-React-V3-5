import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as ws from '../utils/utils';
import PropTypes from 'prop-types';
import ChatsMenu from '../components/ChatsMenu/ChatsMenu';

class ChatsMenuContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleAddChat = this.handleAddChat.bind(this);
		this.handleMenuShow = this.handleMenuShow.bind(this);
	}

	handleMenuShow() {
		this.props.onMenuShow();
	}

	handleAddChat(values) {
		let curUser = localStorage.getItem('user');
		if (!values.users.includes(curUser)) values.users.push(curUser);
		ws.sendChat(values);
		this.handleMenuShow();
		this.props.resetAddChatForm('addChat');
	}

	render() {
		return <ChatsMenu onSubmit={this.handleAddChat} {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		value: state.auth.get('error')
	};
};

ChatsMenuContainer.propTypes = {
	curUser: PropTypes.object
};

export default connect(mapStateToProps, actions)(ChatsMenuContainer);
