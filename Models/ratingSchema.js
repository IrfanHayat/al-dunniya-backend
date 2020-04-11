const mongoose = require('mongoose');

const rating = new mongoose.Schema({
	rating: String,
	userId: String,
});

module.exports = mongoose.model('rating', rating);
