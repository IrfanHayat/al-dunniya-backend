import express from 'express';
import addAppointment from '../Controllers/addAppointment';

const addAppointmentRouter = express.Router();

addAppointmentRouter.post('/:id', addAppointment);

export default addAppointmentRouter;
