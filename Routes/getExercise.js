import express from 'express';
import exercise from '../Controllers/getExercise';

const getExerciseRouter = express.Router();

getExerciseRouter.post('/', exercise.getExercise);
getExerciseRouter.get('/allExercise', exercise.getAllExercise);

getExerciseRouter.get('/:_id', exercise.getExerciseById);

export default getExerciseRouter;
