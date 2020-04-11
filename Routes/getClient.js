import express from 'express';
import client from '../Controllers/getClient';

const getClientRouter = express.Router();

getClientRouter.post('/', client.getClient);
getClientRouter.post('/ID', client.getClientById);
getClientRouter.post('/PASSCODE', client.getClientByPasscode);

export default getClientRouter;
