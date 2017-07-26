import { SEARCH_USER_VAL, SEARCH_MESSAGE_VAL } from '../actionsTypes/index.js';
import { Map } from 'immutable';

export default function(
	state = Map({ searchUserValue: '', searchMessageValue: '' }),
	action
) {
	switch (action.type) {
		case SEARCH_USER_VAL: {
			return state.set('searchUserValue', action.payload);
		}

		case SEARCH_MESSAGE_VAL: {
			return state.set('searchMessageValue', action.payload);
		}

		default:
			return state;
	}
}
