const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
	id: String,
	name: String,
	lastname: String,
	age: String,
	height: String,
	phoneNumber: { type: String, minlength: 0, maxlength: 16 },
	weight: String,
	contactmethod: { type: String },
	problem: String,
	exercise: String,
	email: {
		type: String,
		unique: true,
		required: 'Email address is required',
		match: [
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please fill valid email address',
		],
	},
	passcode: { type: String, maxlength: 15 },
	file: String,
});

module.exports = mongoose.model('clients', clientSchema);
