import React from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';

// import getOnlineUser from '../../utils/getOnlineUser';

import styles from './MessagesList.scss';

class MessagesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getMessages();
		this.props.getAllChats();
	}

	get messages() {
		const { searchMessage, users, firstname, chatName } = this.props;
		var { chats } = this.props;

		if (chatName !== 'general') {
			var searchedChat = chats.filter(chat => {
				return chat.name === chatName;
			});
		}
		var messages =
			chatName == 'general'
				? this.props.messages
				: searchedChat.length ? searchedChat[0].privateMessages : [];

		function unLoggedUserInMes(messages) {
			return messages.map(item => {
				return (item.isLogged = false);
			});
		}

		function foo(messages, users) {
			unLoggedUserInMes(messages);
			for (let i = 0; i < users.length; i++) {
				if (users[i].isLogged) {
					for (let j = 0; j < messages.length; j++) {
						if (users[i].firstname === messages[j].userName) {
							messages[j].isLogged = true;
						}
					}
				}
			}
			return messages;
		}

		foo(messages, users);

		return (
			<div>
				<h2 className={styles['main-chat-header']}>
					Wellcome to the {chatName[0].toUpperCase() + chatName.slice(1)} Chat
				</h2>
				<ul className={styles['message-list']}>
					{messages
						.filter(message => {
							if (searchMessage !== '') {
								const regex = new RegExp(searchMessage, 'i');
								if (regex.test(message.text) || regex.test(message.userName)) {
									return true;
								}
								return false;
							}
							return true;
						})
						.map(message => {
							return (
								<Message key={message._id} {...message} firstname={firstname} />
							);
						})}
				</ul>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.messages}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		messages: [...state.messages],
		searchMessage: state.search.get('searchMessageValue'),
		users: [...state.users],
		firstname: state.auth.getIn(['user', 'firstname']),
		chatName: state.auth.get('chatName'),
		chats: [...state.chats]
	};
};

MessagesList.propTypes = {
	searchMessage: PropTypes.string.isRequired,
	users: PropTypes.array.isRequired,
	firstname: PropTypes.string.isRequired,
	chatName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, actions)(MessagesList);
