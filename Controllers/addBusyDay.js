import moment from 'moment';
import Busydayschema from '../Models/busyDaySchema';

const addBusyday = async (req, res, next) => {
	const { date, userId } = req.body;

	console.log(date);
	const oldBusyDate = await Busydayschema.find({ date: moment(moment.utc(date).format()) });

	if (oldBusyDate.length > 0) {
		const busyDay = await Busydayschema.deleteOne({
			date: moment(moment.utc(date).format()),
		});
		res.json(busyDay);
	} else {
		const busyDay = new Busydayschema({
			date,
			userId,
		});
		busyDay
			.save()
			.then(saveDate => {
				res.status(200).json({ saveDate });
			})
			.catch(error => {
				next(new Error(error));
			});
	}
};

export default addBusyday;
