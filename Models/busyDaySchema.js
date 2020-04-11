const mongoose = require('mongoose');

const busyDaySchema = new mongoose.Schema({
	date: Date,
	userId: String,
});

module.exports = mongoose.model('busyDay', busyDaySchema);
