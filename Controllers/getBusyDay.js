import Busydayschema from '../Models/busyDaySchema';

const getAllBusyDay = (req, res) => {
	Busydayschema.find({ userId: req.params.id }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Busy day does not exist');
		}
	});
};

export default getAllBusyDay;
