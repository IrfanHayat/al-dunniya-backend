import express from 'express';
import appointments from '../Controllers/getAppointments';

const getAppointmentRouter = express.Router();
getAppointmentRouter.get('/', appointments.getAllAppointments);
getAppointmentRouter.post('/ID', appointments.getAllAppointmentsById);
getAppointmentRouter.get('/:_id', appointments.getAppointmentById);
export default getAppointmentRouter;
