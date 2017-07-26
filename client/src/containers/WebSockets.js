import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';
import * as ws from '../utils/utils';
import { Map } from 'immutable';

class WebSockets extends React.Component {
	constructor(props) {
		super(props);
	}

	connectToChat(chatName) {
		const { user } = this.props;

		if (user) {
			const {
				sendMessage,
				joinChat,
				leaveChat,
				getAllUsers,
				getMessages,
				getAllChats,
				addChat,
				sendPrivateMessage
			} = this.props;

			ws.disconnect();

			ws.initConnection();
			
			ws.addListener('message', sendMessage);
			ws.addListener('chat', addChat);

			ws.addListener('join', getAllUsers);
			ws.addListener('join', getMessages);
			ws.addListener('join', getAllChats);

			ws.addListener('leave', getAllUsers);
			ws.addListener('leave', getMessages);

			ws.addPrivateListener('add-private-message', sendPrivateMessage);
		}
	}

	componentWillMount() {
		const { chatName } = this.props;
		this.connectToChat(chatName);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.chatName !== this.props.chatName) {
			this.connectToChat(this.props.chatName);
		}
	}

	componentWillUnmount() {
		ws.disconnect();
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => {
	return { user: state.auth.get('user'), chatName: state.auth.get('chatName') };
};

WebSockets.propTypes = {
	user: PropTypes.object.isRequired,
	chatName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, actions)(WebSockets);
