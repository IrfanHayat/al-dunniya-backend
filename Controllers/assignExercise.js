import mongoose from 'mongoose';
import moment from 'moment';
import Busydayschema from '../Models/busyDaySchema';
import AssignExerciseSchema from '../Models/assignExerciseSchema';
import ExerciseSchema from '../Models/exerciseSchema';

const assignExercise = async (req, res, next) => {
	const { exercise, sets, reps, userId, startDate, endDate } = req.body;
	const exerciseData = await ExerciseSchema.findOne({ name: exercise });
	const assignedExercise = new AssignExerciseSchema({
		exercise,
		sets,
		reps,
		userId: mongoose.Types.ObjectId(userId),
		startDate,
		endDate,
		exercise_data: mongoose.Schema.Types.ObjectId(exerciseData._id),
	});

	assignedExercise
		.save()
		.then(SavedAssign => {
			console.log(SavedAssign);
			return res.status(200).send({
				Message: 'exercise Assigned.',
				AssignExercise: SavedAssign,
			});
		})
		.catch(err => {
			res.status(500);
			next(new Error(err));
		});
};

export default assignExercise;
