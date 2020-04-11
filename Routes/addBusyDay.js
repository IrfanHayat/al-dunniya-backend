import express from 'express';
import addBusyDay from '../Controllers/addBusyDay';

const addBusyDayRouter = express.Router();

addBusyDayRouter.post('/', addBusyDay);

export default addBusyDayRouter;
