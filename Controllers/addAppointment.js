import moment from 'moment';
import mongoose from 'mongoose';
import AppointSchema from '../Models/appointSchema';

const addAppointment = async (req, res, next) => {
	const { date, time, notes, userId } = req.body;
	const newDate = moment(date, 'YYYY-MM-DD', true);
	const newTime = moment(time, 'HH:mm', true);
	const count = await AppointSchema.find({ userId: req.params.id }).countDocuments();
	if (req.params.id) {
		if (count > 0) {
			const result = await AppointSchema.find({ userId: req.params.id }, { date: 1 })
				.sort({ _id: -1 })
				.limit(1);
			result.forEach(async appointDate => {
				const oldDate = moment(appointDate.date, 'YYYY-MM-DD', true);
				const currentDate = newDate;
				const twoWeek = oldDate
					.clone()
					.add(14, 'days')
					.startOf('date');

				if (currentDate.isBetween(oldDate, twoWeek) || currentDate.isSame(oldDate)) {
					res.status(401).json({ Message: 'Current Date is in a week', status: 401 });
				} else {
					console.log('What the hell2');
					const dateMatch = await AppointSchema.findOne({ date });
					if (dateMatch) {
						res.status(401);
						next(new Error('Please enter a new date'));
					}

					if (newDate.isValid() && newTime.isValid() && !dateMatch) {
						const Appointment = new AppointSchema({
							date,
							time,
							notes,
							userId: mongoose.Types.ObjectId(userId),
						});

						Appointment.save()
							.then(SavedAppointment => {
								console.log(SavedAppointment);
								return res.status(200).send({
									Message: 'Appointment scheduled.',
									Appointment: SavedAppointment,
									status: 200,
								});
							})
							.catch(err => {
								res.status(500);
								next(new Error(err));
							});
					} else {
						res.status(401);
						next(new Error('Please enter valid date or time'));
					}
				}
			});
		} else {
			console.log('What the hell');
			const dateMatch = await AppointSchema.findOne({ date });
			if (dateMatch) {
				res.status(401);
				next(new Error('Please enter a new date'));
			}

			if (newDate.isValid() && newTime.isValid()) {
				const Appointment = new AppointSchema({
					date,
					time,
					notes,
					userId: mongoose.Types.ObjectId(userId),
				});

				Appointment.save()
					.then(SavedAppointment => {
						console.log(SavedAppointment);
						return res.status(200).send({
							Message: 'Appointment scheduled.',
							Appointment: SavedAppointment,
						});
					})
					.catch(err => {
						res.status(500);
						next(new Error(err));
					});
			} else {
				res.status(401);
				next(new Error('Please enter valid date or time'));
			}
		}

		return 0;
	}
};

export default addAppointment;
