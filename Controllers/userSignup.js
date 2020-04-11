import bcryptjs from 'bcryptjs';
import UserSchema from '../Models/userSchema';

const userSignUp = (req, res, next) => {
	const { name, password, email, username } = req.body;
	const query = { email };

	UserSchema.findOne(query)
		.then(user => {
			if (user) {
				if (user.email == email) {
					res.status(400);
					next(new Error('Email Already Taken.'));
				}
			} else {
				bcryptjs.hash(password, 12).then(hashedpassword => {
					const User = new UserSchema({
						name,
						password: hashedpassword,
						username,
						email,
					});
					// console.log(User);
					User.save()
						.then(SavedUser => {
							console.log(SavedUser);
							return res.status(200).send({
								Message: 'Account Created Successfully.',
							});
						})
						// eslint-disable-next-line no-unused-vars
						.catch(err => {
							res.status(500);
							next(new Error('Unable to Create User. Please Try later.'));
						});
				});
			}
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

export default userSignUp;
