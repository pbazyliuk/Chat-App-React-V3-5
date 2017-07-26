import { GET_ALL_USERS } from '../actionsTypes/index.js';
import { List } from 'immutable';

export default function(state = List([]), action) {
	switch (action.type) {
		case GET_ALL_USERS: {
			return List([...action.payload]);
		}

		default:
			return state;
	}
}
