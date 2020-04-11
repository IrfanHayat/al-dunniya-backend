import status from 'http-status';

const userSignup = (req, res, next) => {
	const { password, email, name, username } = req.body;
	if (!name || !email || !username || !password) {
		res.status(status.BAD_REQUEST);
		next(
			new Error(
				'users name, email, password and username Must be Defined in request body',
			),
		);
	} else {
		next();
	}
};

const userSignin = (req, res, next) => {
	const { password, email } = req.body;
	if (!email || !password) {
		res.status(status.BAD_REQUEST);
		next(new Error('email, password Must be Defined in request body'));
	} else {
		next();
	}
};

export default { userSignup, userSignin };
