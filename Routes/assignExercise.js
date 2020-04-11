import express from 'express';
import assignExercise from '../Controllers/assignExercise';

const assignExerciseRouter = express.Router();

assignExerciseRouter.post('/',  assignExercise);

export default assignExerciseRouter;
