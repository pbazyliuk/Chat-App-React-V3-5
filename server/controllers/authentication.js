const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.login = function(req, res, next) {

	User.findOne(
		{ email: req.user.email },
		{ _id: 1, firstname: 1, lastname: 1, email: 1, isLogged: 1 },
		function(err, curUser) {
			if (err) {
				return next(err);
			}

			if (!curUser.isLogged && curUser) {
				res.send({ token: tokenForUser(req.user), user: curUser });
			} else {
				res.status(422).send({ error: 'User has already been logged!' });
			}
		}
	);
};

exports.register = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide valid email and password' });
	}

	User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		const user = new User({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			isLogged: false
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}

			User.findOne(
				{ email: email },
				{ _id: 1, firstname: 1, lastname: 1, email: 1 },
				function(err, curUser) {
					if (err) {
						return next(err);
					}

					if (curUser) {
						res.json({ token: tokenForUser(user), user: curUser });
					}
				}
			);
		});
	});
};

exports.getAllUsers = function(req, res, next) {
	User.find(
		{},
		{ _id: 1, firstname: 1, lastname: 1, email: 1, isLogged: 1, timestamp: 1 },
		function(err, users) {
			if (err) {
				return next(err);
			}

			if (users) {
				res.send(users);
			}
		}
	);
};
