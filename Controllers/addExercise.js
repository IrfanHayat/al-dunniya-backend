import AWS from 'aws-sdk';
import fs from 'fs';
import mongoose from 'mongoose';
import ExerciseSchema from '../Models/exerciseSchema';

const addExercise = async (req, res, next) => {
	const { name, description } = req.body;
	const filepath = `${__dirname}/../uploads/image/${req.file.filename}`;
	const BUCKET = process.env.awsBucketName;
	const REGION = 'us-east-2';
	const ACCESS_KEY = 'AKIAJZ3VQPKWZK3ZWOHA';
	const SECRET_KEY = process.env.awsSecretAccessKey;
	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_KEY,
		region: REGION,
	});

	const S3 = new AWS.S3();
	const fileContent = fs.readFileSync(filepath);

	const params = {
		Bucket: BUCKET,
		Key: `al-dunia/${req.file.path.replace(/\\/g, '/')}`, // File name you want to save as in S3
		Body: fileContent,
		ContentType: 'image/jpeg,video/jpeg',
	};

	S3.putObject(params, err => {
		if (err) {
			next(Error(err));
		} else {
			const filePath = `https://al-dunia.s3.us-east-2.amazonaws.com/al-dunia/${req.file.path.replace(
				/\\/g,
				'/',
			)}`;
			const Exercise = new ExerciseSchema({
				name,
				description,
				file: filePath,
			});
			Exercise.save()
				.then(SavedExercise => {
					return res.status(200).send({ SavedExercise, Message: 'Add Exercise successfully' });
				})
				.catch(err => {
					res.status(500);
					next(new Error(err));
				});
		}
	});
};

const editExercise = async (req, res) => {
	const { _id } = req.params;
	console.log(_id);
	const { description } = req.body;
	console.log(description);
	const result = await ExerciseSchema.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(_id) },
		{ $set: { description } },
		{ new: true },
	);
	if (result) {
		res.status(200).json({ message: 'Edit exercise description successfully', result });
	} else {
		res.status(400).json({ message: 'Description not found' });
	}
};

export default { addExercise, editExercise };
