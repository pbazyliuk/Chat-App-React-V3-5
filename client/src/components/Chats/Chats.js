import React from 'react';
import PropTypes from 'prop-types';

import ChatsNavbar from '../ChatsNavbar/ChatsNavbar';
import UsersList from '../UsersList/UsersList';
import ChatsMenuContainer from '../../containers/ChatsMenuContainer';
import WebSockets from '../../containers/WebSockets';
import ChatsList from '../ChatsList/ChatsList';
import MainChatsContainer from '../../containers/MainChatsContainer';

import styles from './Chats.scss';

class Chats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
			isMenuShown: false
		};

		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleMenuShow = this.handleMenuShow.bind(this);
	}

	handleSizeChange() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	handleMenuShow() {
		this.setState(prevState => ({
			isMenuShown: !prevState.isMenuShown
		}));
	}

	render() {
		const collapseWidth = {
			width: '108px',
			overflow: 'hidden'
		};

		const expandWidth = {
			width: 'calc(100% - 108px)'
		};

		return (
			<div className={styles['wrapper']}>
				<WebSockets />

				<aside
					className={styles['aside-part']}
					style={this.state.isToggleOn ? collapseWidth : {}}
				>
					<ChatsNavbar
						onSizeChange={this.handleSizeChange}
						onMenuShow={this.handleMenuShow}
						data={this.state}
					/>
					<ChatsMenuContainer
						data={this.state}
						onMenuShow={this.handleMenuShow}
					/>
					<ChatsList data={this.state} />
					<UsersList data={this.state} />
				</aside>
				<div
					className={styles['main-part']}
					style={this.state.isToggleOn ? expandWidth : {}}
				>
					<MainChatsContainer />
				</div>
			</div>
		);
	}
}

Chats.propTypes = {
	isToggleOn: PropTypes.bool,
	isMenuShown: PropTypes.bool
};

export default Chats;
