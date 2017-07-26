import { SEND_MESSAGE, GET_MESSAGES } from '../actionsTypes/index.js';
import { List } from 'immutable';

export default function reducer(state = List([]), action) {
	switch (action.type) {
		case SEND_MESSAGE: {
			return state.push(action.payload);
			// return state.concat([action.payload]);
		}
		case GET_MESSAGES: {
			return List(action.payload);
		}
		default:
			return state;
	}
}
