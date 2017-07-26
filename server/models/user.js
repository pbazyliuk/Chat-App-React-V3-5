const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

//Define User Model
const userSchema = new Schema({
	firstname: String,
	lastname: String,
	isLogged: Boolean,
	email: { type: String, unique: true, lowercase: true },
	password: String
});

//On Save Hook, encrypt password

//Before saving this model, run this function
userSchema.pre('save', function(next) {
	//get access to the user model
	const user = this;

	//generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		//hash (encryot) our password usign the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			//overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

//Create the model class
const ModelClass = mongoose.model('user', userSchema, 'USERS');

//Export the model
module.exports = ModelClass;
