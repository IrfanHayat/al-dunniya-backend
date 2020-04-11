import mongoose from 'mongoose';
import ExerciseSchema from '../Models/exerciseSchema';

const getExercise = (req, res) => {
	const { _id } = req.body;

	ExerciseSchema.findOne({ _id: mongoose.Types.ObjectId(_id) }, (err, exercise) => {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else if (exercise) {
			res.status(200).send(exercise);
		} else {
			res.send('Exercise not found');
		}
	});
};

const getAllExercise = (req, res) => {
	ExerciseSchema.find({}, (err, exercise) => {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else if (exercise) {
			res.status(200).send(exercise);
		} else {
			res.send('Exercise not found');
		}
	});
};

const getExerciseById = (req, res) => {
	const { _id } = req.params;

	ExerciseSchema.findOne({ _id }, (err, exercise) => {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else if (exercise) {
			res.status(200).send(exercise);
		} else {
			res.send('Exercise not found');
		}
	});
};

export default { getAllExercise, getExercise, getExerciseById };
