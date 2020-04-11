import express from 'express';
import multer from 'multer';
import client from '../Controllers/addClient';

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads');
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}-${file.originalname}`);
	},
});

const fileFilter = (req, file, callback) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const upload = multer({ storage, fileFilter });
const addClientRouter = express.Router();

addClientRouter.post('/', upload.single('file'), client.addClient);
addClientRouter.post('/mobile', client.addMobileClient);
addClientRouter.get('/getAllClient', client.getAllClient);
addClientRouter.put('/updateClient/:_id', client.updateClient);
addClientRouter.delete('/delete/:_id', client.deleteClient);
export default addClientRouter;
