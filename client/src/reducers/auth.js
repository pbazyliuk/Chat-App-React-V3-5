import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	UPDATE_CHATNAME
} from '../actionsTypes/index.js';
import { Map } from 'immutable';

export default function(
	state = Map({ user: null, authenticated: false, error: '' }),
	action
) {
	switch (action.type) {
		case AUTH_USER: {
			if (!action.payload) {
				action.payload = JSON.parse(localStorage.getItem('user'));
			}

			return state.merge({
				authenticated: true,
				user: Map(action.payload),
				error: '',
				chatName: 'general'
			});
		}

		case UNAUTH_USER: {
			return state.merge({
				user: null,
				authenticated: false,
				error: '',
				chatName: ''
			});
		}
		case AUTH_ERROR:
			return state.set('error', action.payload);

		case UPDATE_CHATNAME:
			return state.set('chatName', action.payload);

		default:
			return state;
	}
}
