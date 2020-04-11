import express from 'express';
import events from '../Controllers/event';

const eventRouter = express.Router();

eventRouter.post('/add', events.addEvent);

eventRouter.get('/', events.getEvents);

eventRouter.get('/:eid', events.getSingleEvent);

eventRouter.delete('/delete/:id', events.deleteEvent);

eventRouter.put('/edit/:id', events.editEvent);

export default eventRouter;
