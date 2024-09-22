import express, { Router } from 'express';
import { getUser, updateUserDetails } from '../controllers/userController';

const userRoute: Router = express.Router();

userRoute.get('/getuser/:userId', getUser);
userRoute.put('/updateuserdeletails/:userId', updateUserDetails);

export default userRoute;
