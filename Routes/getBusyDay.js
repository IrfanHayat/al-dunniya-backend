import express from 'express';
import getBusyDay from '../Controllers/getBusyDay';

const getBusyDayRouter = express.Router();
getBusyDayRouter.get('/:id', getBusyDay);

export default getBusyDayRouter;
