import axios from 'axios';
import { history } from '../history/history';
import { reset } from 'redux-form';
import * as ws from '../utils/utils';

import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	GET_ALL_USERS,
	JOIN_CHAT,
	SEND_MESSAGE,
	LEAVE_CHAT,
	GET_MESSAGES,
	SEARCH_MESSAGE_VAL,
	SEARCH_USER_VAL,
	SAVE_AUTH_USER,
	ADD_CHAT,
	GET_ALL_CHATS,
	UPDATE_CHATNAME,
	SEND_PRIVATE_MESSAGE,
	GET_PRIVATE_MESSAGES
} from '../actionsTypes/index.js';

const ROOT_URL = 'http://localhost:8081';

export function registerUser({ firstname, lastname, email, password }) {
	return function(dispatch) {
		axios
			.post(`${ROOT_URL}/register`, { firstname, lastname, email, password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				dispatch({ type: AUTH_USER, payload: response.data.user });

				history.push('/chat');
			})
			.catch(() => {
				dispatch(authError('Bad Register Info'));
			});
	};
}

export function loginUser({ email, password }) {
	return function(dispatch) {
		axios
			.post(`${ROOT_URL}/login`, { email, password })
			.then(response => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('user', JSON.stringify(response.data.user));

				dispatch({ type: AUTH_USER, payload: response.data.user });
				history.push('/chat');
			})
			.catch(() => {
				dispatch(authError('Bad Login Info'));
			});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function logoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	return { type: UNAUTH_USER };
}

export function getAllUsers() {
	return function(dispatch) {
		axios
			.get(`${ROOT_URL}/api/users`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('token')
				}
			})
			.then(response => {
				dispatch({ type: GET_ALL_USERS, payload: response.data });
			})
			.catch(() => {
				dispatch(authError('Some problems occurs with users fetch action'));
			});
	};
}

export function sendMessage(data) {
	return function(dispatch) {
		dispatch({ type: SEND_MESSAGE, payload: data });
	};
}

export function getMessages() {
	return function(dispatch) {
		axios
			.get(`${ROOT_URL}/api/messages`)
			.then(response => {
				dispatch({ type: GET_MESSAGES, payload: response.data });
			})
			.catch(e => {
				dispatch(authError('Some problems occurs with users send message!'));
			});
	};
}

export function searchUserVal(value) {
	return function(dispatch) {
		dispatch({ type: SEARCH_USER_VAL, payload: value });
	};
}

export function searchMessageVal(value) {
	return function(dispatch) {
		dispatch({ type: SEARCH_MESSAGE_VAL, payload: value });
	};
}

export function addChat(data) {
	return function(dispatch) {
		dispatch({ type: ADD_CHAT, payload: data });
	};
}

export function getAllChats(data) {
	return function(dispatch) {
		axios
			.get(`${ROOT_URL}/api/chats`)
			.then(response => {
				dispatch({ type: GET_ALL_CHATS, payload: response.data });
			})
			.catch(() => {
				dispatch(authError('Bad data submited...'));
			});
	};
}

export function resetAddChatForm(name) {
	return function(dispatch) {
		dispatch(reset(name));
	};
}

export function updateChatName(chatName) {
	chatName = chatName || 'general';
	return function(dispatch) {
		dispatch({ type: 'UPDATE_CHATNAME', payload: chatName });
	};
}

export function sendPrivateMessage(message, room) {
	return function(dispatch) {
		dispatch({
			type: 'SEND_PRIVATE_MESSAGE',
			payload: message,
			chatName: room
		});
	};
}

export function getPrivateChatMessages() {
	return function(dispatch) {
		axios
			.get(`${ROOT_URL}/api/chats`)
			.then(response => {
				dispatch({ type: GET_ALL_CHATS, payload: response.data });
			})
			.catch(() => {
				dispatch(authError('Bad data submited...'));
			});
	};
}
