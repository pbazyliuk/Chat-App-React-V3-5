const Authentication = require('./controllers/authentication');
const Messages = require('./controllers/messages');
const Chats = require('./controllers/Chats');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code ABC123' });
	});
	app.post('/login', requireLogin, Authentication.login);
	app.post('/register', Authentication.register);

	//Get all registered users route
	app.get('/api/users', Authentication.getAllUsers);

	//Create message in main chat route
	app.post('/api/messages', Messages.createMessage);

	//Get all messages from main chat route
	app.get('/api/messages', Messages.getAllMessages);

	//Get all private chats route
	app.get('/api/chats', Chats.getAllChats);

	//Create private chat route
	app.post('/api/chats', Chats.createChat);
};
