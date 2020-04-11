import express from 'express';
import assignExercise from '../Controllers/getAllAssignExercise';

const getAllAssignExerciseRouter = express.Router();
getAllAssignExerciseRouter.get('/', assignExercise.getAllAssignExercise);
getAllAssignExerciseRouter.post('/ID', assignExercise.getAllAssignExerciseById);
getAllAssignExerciseRouter.post('/:userId', assignExercise.getAllAssignExerciseByDate);

export default getAllAssignExerciseRouter;
