import shortid from 'shortid';
import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import fs from 'fs';

import ClientSchema from '../Models/clientSchema';

const addClient = (req, res, next) => {
	const { name, lastname, age, height, phoneNumber, weight, contactmethod, problem, email, exercise } = req.body;
	let { passcode } = req.body;
	const filepath = `${__dirname}/../uploads/${req.file.filename}`;
	const BUCKET = process.env.awsBucketName;
	const REGION = 'us-east-2';
	const ACCESS_KEY = 'AKIAJZ3VQPKWZK3ZWOHA';
	const SECRET_KEY = process.env.awsSecretAccessKey;
	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_KEY,
		region: REGION,
	});
	const fileContent = fs.readFileSync(filepath);

	// Setting up S3 upload parameters
	const params = {
		Bucket: BUCKET,
		Key: `al-dunia/${req.file.path.replace(/\\/g, '/')}`, // File name you want to save as in S3
		Body: fileContent,
		ContentType: 'image/jpeg',
	};

	const S3 = new AWS.S3();
	passcode = shortid.generate();
	const query = { $or: [{ email }, { name }] };
	ClientSchema.findOne(query)
		.then(user => {
			if (user) {
				if (user.name === name || user.email === email) {
					res.status(400).json({ user, error: 'duplicate email' });
				}
			} else {
				S3.putObject(params, err => {
					if (err) {
						next(Error(err));
					} else {
						const filePath = `https://al-dunia.s3.us-east-2.amazonaws.com/al-dunia/${req.file.path.replace(
							/\\/g,
							'/',
						)}`;
						console.log(filePath);

						const Client = new ClientSchema({
							name,
							lastname,
							age,
							height,
							phoneNumber,
							weight,
							contactmethod,
							problem,
							exercise,
							passcode,
							email,
							file: filePath,
						});
						Client.save()
							.then(SavedUser => {
								return res.status(200).send({
									SavedUser,
								});
							})
							.catch(error => {
								res.status(500);
								next(new Error(error));
							});
					}
				});
			}
		})
		.catch(err => {
			next(new Error(err));
		});
};

const addMobileClient = (req, res, next) => {
	const {
		id,
		name,
		lastname,
		age,
		height,
		phoneNumber,
		weight,
		contactmethod,
		problem,
		email,
		exercise,
		file,
	} = req.body;
	let { passcode } = req.body;

	passcode = shortid.generate();
	const query = { $or: [{ email }, { name }] };
	ClientSchema.findOne(query)
		.then(user => {
			if (user) {
				if (user.name === name || user.email === email) {
					res.status(200).json({ user });
				}
			} else {
				const Client = new ClientSchema({
					id,
					name,
					lastname,
					age,
					height,
					phoneNumber,
					weight,
					contactmethod,
					problem,
					exercise,
					passcode,
					email,
					file,
				});
				Client.save()
					.then(SavedUser => {
						return res.status(200).send({
							SavedUser,
						});
					})
					.catch(error => {
						res.status(500);
						next(new Error(error));
					});
			}
		})
		.catch(err => {
			next(new Error(err));
		});
};

const deleteClient = (req, res) => {
	const { _id } = req.params;
	console.log(_id);
	ClientSchema.deleteOne({ _id: mongoose.Types.ObjectId(_id) }).then(deleteclient => {
		res.status(200).json(deleteclient);
	});
};

const updateClient = (req, res) => {
	const {
		id,
		name,
		lastname,
		age,
		height,
		phoneNumber,
		weight,
		contactmethod,
		problem,
		email,
		exercise,
		file,
	} = req.body;
	const { _id } = req.params;
	console.log(_id);
	ClientSchema.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(_id) },
		{
			$set: {
				id,
				name,
				lastname,
				age,
				height,
				phoneNumber,
				weight,
				contactmethod,
				problem,
				exercise,
				email,
				file,
			},
		},
	).then(updateclient => {
		if (updateclient) {
			res.status(200).json(updateclient);
		} else {
			res.status(400).json({ message: 'error' });
		}
	});
};

const getAllClient = (req, res) => {
	ClientSchema.find({}).then(clients => {
		res.send(clients);
	});
};

export default { addClient, getAllClient, addMobileClient, deleteClient, updateClient };
