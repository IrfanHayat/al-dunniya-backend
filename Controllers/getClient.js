import ClientSchema from '../Models/clientSchema';

const getClient = (req, res) => {
	const { passcode } = req.body;
	console.log('I am here');
	ClientSchema.findOne({ passcode }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Client doesnot exist');
		}
	});
};

const getClientById = (req, res) => {
	const { _id } = req.body;

	ClientSchema.findOne({ _id }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Client doesnot exist');
		}
	});
};

const getClientByPasscode = (req, res) => {
	const { passcode } = req.body;

	ClientSchema.findOne({ passcode }, (err, user) => {
		if (err) {
			res.status(500).send();
		} else if (user) {
			res.status(200).send(user);
		} else {
			res.send('Client doesnot exist');
		}
	});
};

export default { getClient, getClientById, getClientByPasscode };
