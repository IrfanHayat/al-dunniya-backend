import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import dbConnection from './Connection/dbConnect';
import Router from './Routes/Router';
import errorHandler from './Middlewares/errorHandler';

dbConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
	res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

app.use('/signup', Router.SignupRouter);

app.use('/signin', Router.SigninRouter);

app.use('/event', Router.EventRouter);

app.use('/client', Router.AddClientRouter);

app.use('/exercise', Router.AddExerciseRouter);

app.use('/getClient', Router.GetClientRouter);

app.use('/getExercise', Router.GetExerciseRouter);

app.use('/appointment', Router.AddAppointmentRouter);

app.use('/assignExercise', Router.AssignExerciseRouter);

app.use('/getAllAppointment', Router.getAppointmentRouter);

app.use('/getAllAssignExcercise', Router.getAllAssignExerciseRouter);

app.use('/addBusyDay', Router.addBusyDayRouter);

app.use('/getBusyDay', Router.getBusyDayRouter);

app.use('/addRating', Router.addRatingRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening On port http://localhost/${port}`));


