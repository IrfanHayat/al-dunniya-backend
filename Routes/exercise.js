import express from 'express';
import multer from 'multer';
import exercise from '../Controllers/addExercise';

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads/image');
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });
const addExerciseRouter = express.Router();

addExerciseRouter.post('/', upload.single('file'));
addExerciseRouter.put('/edit/:_id', exercise.editExercise);


export default addExerciseRouter;
