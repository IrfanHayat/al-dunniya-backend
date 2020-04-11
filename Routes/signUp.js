import express from 'express';
import userSignUp from '../Controllers/userSignup';
import userValidator from '../validations/user';

const signUpRouter = express.Router();

signUpRouter.post('/', userValidator.userSignup, userSignUp);

export default signUpRouter;
