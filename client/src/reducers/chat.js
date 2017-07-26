import {
	ADD_CHAT,
	GET_ALL_CHATS,
	SEND_PRIVATE_MESSAGE,
	GET_PRIVATE_MESSAGES
} from '../actionsTypes/index.js';
import { Map, List } from 'immutable';

export default function reducer(state = List([]), action) {
	switch (action.type) {
		case ADD_CHAT: {
			return state.push(action.payload);
		}

		case GET_ALL_CHATS: {
			return List(action.payload);
		}

		case SEND_PRIVATE_MESSAGE:
			var obj = {};
			var idx = 0;
			var clone = [...state];
			for (let i = 0; i < [...state].length; i++) {
				if ([...state][i].name === action.chatName) {
					obj = [...state][i];
					idx = i;
				}
			}

			clone[idx].privateMessages.push(action.payload);

			return clone;

		default:
			return state;
	}
}
