import React from 'react';
import PropTypes from 'prop-types';
import MessagesNavbar from '../components/MessagesNavbar/MessagesNavbar';
import MessagesList from '../components/MessagesList/MessagesList';
import MessagesInput from '../components/MessagesInput/MessagesInput';

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as ws from '../utils/utils';

class CommonChatContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const chatName = this.props.match.params.id || 'general';
		this.props.updateChatName(chatName);
	}

	componentDidUpdate() {
		const chatName = this.props.match.params.id || 'general';
		this.props.updateChatName(chatName);

		if (chatName !== 'general') {
			// ws.disconnect();
			ws.disconnectPrivate();
			ws.initPrivateConnection(chatName);
		} else {
			ws.disconnectPrivate();
			// ws.initConnection();
		}
	}

	componentUnMount() {
		ws.disconnect();
		ws.disconnectPrivate();
		// ws.initPrivateConnection(chatName);
	}

	render() {
		return (
			<div>
				<MessagesNavbar />
				<MessagesList />
				<MessagesInput />
			</div>
		);
	}
}

CommonChatContainer.propTypes = {
	chatName: PropTypes.string
};

export default connect(null, actions)(CommonChatContainer);
