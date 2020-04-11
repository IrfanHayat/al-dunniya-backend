import mongoose from 'mongoose';
import appointSchema from '../Models/appointSchema';

const getAllAppointments = (req, res) => {
	appointSchema.find({}, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Appointement doesnot exist');
		}
	});
};

const getAllAppointmentsById = (req, res) => {
	const { userId } = req.body;
	appointSchema.find({ userId }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Appointement doesnot exist');
		}
	});
};
const getAppointmentById = (req, res) => {
	const { _id } = req.params;
	
	appointSchema.findById({ _id: mongoose.Types.ObjectId(_id) }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Appointement doesnot exist');
		}
	});
};

export default { getAllAppointments, getAllAppointmentsById, getAppointmentById };
