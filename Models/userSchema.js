const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	email: {
		type: String,
		unique: true,
	},
});

module.exports = mongoose.model('users', userSchema);
