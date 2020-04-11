const mongoose = require('mongoose');

const appointSchema = new mongoose.Schema({
	date: Date,
	time: String,
	notes: String,
	userId: String,
});

module.exports = mongoose.model('appoint', appointSchema);
