const mongoose = require('mongoose');

const assignExerciseSchema = new mongoose.Schema({
	exercise: { type: String },
	sets: { type: String },
	reps: { type: String },
	userId: { type: String },
	startDate: { type: Date },
	endDate: { type: Date },
	exercise_description: { type: mongoose.Schema.Types.ObjectId, ref: 'exercise' },
});

module.exports = mongoose.model('assignExercise', assignExerciseSchema);
