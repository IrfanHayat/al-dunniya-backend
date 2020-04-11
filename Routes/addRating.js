import express from 'express';
import rating from '../Controllers/addRating';

const addRatingRouter = express.Router();

addRatingRouter.post('/', rating);

export default addRatingRouter;
