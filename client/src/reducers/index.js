import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import messageReducer from './message';
import searchReducer from './search';
import usersReducer from './users';
import chatsReducer from './chat';

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	messages: messageReducer,
	search: searchReducer,
	users: usersReducer,
	chats: chatsReducer
});

export default rootReducer;
