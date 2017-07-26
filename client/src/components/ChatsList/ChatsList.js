import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';

import * as actions from '../../actions/index';
import { Map } from 'immutable';

import styles from './ChatsList.scss';

class ChatsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const isVisible = {
			display: 'none'
		};

		const { chats, user, chatName } = this.props;
		const userFirstname = user.get('firstname');

		return (
			<ul
				className={styles['chat-list']}
				style={this.props.data.isMenuShown ? isVisible : {}}
			>
				{chats
					.filter(chat => {
						if (chat.usersNames.includes(userFirstname)) return true;
					})
					.map(function(chat) {
						return <Chat {...chat} key={chat._id} chatName={chatName} />;
					})}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	return {
		chats: [...state.chats],
		user: state.auth.get('user'),
		chatName: state.auth.get('chatName')
	};
};

ChatsList.propTypes = {
	chats: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	chatName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, actions)(ChatsList);
