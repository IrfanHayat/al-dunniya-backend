import moment from 'moment';
import assignExerciseSchema from '../Models/assignExerciseSchema';
import Busydayschema from '../Models/busyDaySchema';
import ExerciseSchema from '../Models/exerciseSchema';
import AppointSchema from '../Models/appointSchema';

const getAllAssignExercise = (req, res) => {
	assignExerciseSchema.find({}, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Assign Exercise doesnot exist');
		}
	});
};

const getAllAssignExerciseById = (req, res) => {
	const { userId } = req.body;
	assignExerciseSchema.find({ userId }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Assign Exercise doesnot exist');
		}
	});
};

const getAllAssignExerciseByDate = (req, res) => {
	const { startDate } = req.body;
	const { userId } = req.params;

	assignExerciseSchema.find({ userId }, async (err, user) => {
		if (err) {
			res.status(500).send(err);
		} else if (user.length > 0) {
			const count = await Busydayschema.findOne({
				userId,
				date: moment(moment.utc(startDate).format()),
			}).countDocuments();

			if (count <= 0) {
				const exercise = await assignExerciseSchema.find({
					userId,
					startDate: { $lte: new Date(moment.utc(startDate).format()) },
					endDate: { $gte: new Date(moment.utc(startDate).format()) },
				});
				console.log('=====================');
				console.log(exercise);
				console.log('=====================');

				let exercises = await Promise.all(
					exercise.map(async result => {
						const response = await ExerciseSchema.findOne({ name: result.exercise });
						// console.log(response);;
						return {
							type: 'exercise',
							...result._doc,
							file: response.file,
							description: response.description,
						};
					}),
				);

				const appointement = await AppointSchema.find({
					date: new Date(moment.utc(startDate).format()),
				});
				const appoint = appointement.map(result => {
					return { type: 'appointement', time: result.time, notes: result.notes, date: result.date };
				});
				res.status(200).send({ exercises, appoint });
			} else {
				const busyDay = await Busydayschema.find({ userId, date: moment(moment.utc(startDate).format()) });
				busyDay.forEach(result => {
					res.status(200).json({ type: 'busyDay', busyRecord: result });
				});
			}
		} else {
			res.send('Assign Exercise doesnot exist');
		}
	});
};

export default { getAllAssignExercise, getAllAssignExerciseById, getAllAssignExerciseByDate };
