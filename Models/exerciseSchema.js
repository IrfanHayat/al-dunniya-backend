const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		file: String,
	},
	{ timestamps: true },
);

module.exports = mongoose.model('exercise', exerciseSchema);
