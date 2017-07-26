const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const messageSchema = new Schema({
	chatId: String,
	userId: String,
	userName: String,
	text: String,
	timestamp: Number
});

// Create the model class
const ModelClass = mongoose.model('message', messageSchema, 'MESSAGES');

// Export the model
module.exports = ModelClass;
