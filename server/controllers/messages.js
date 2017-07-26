const Message = require('../models/message');

exports.getAllMessages = function(req, res) {
	Message.find({}, function(err, messages) {
		if (err) return err;
		res.send(messages);
	});
};

exports.createMessage = function(req, res) {
	Message.create(req.body, function(err, message) {
		if (err) return err;

		res.send(message);
	});
};
