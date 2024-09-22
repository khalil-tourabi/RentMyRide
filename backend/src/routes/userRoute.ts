import express, { Router } from 'express';
import { getUser, updateUserDetails, BookCar } from '../controllers/userController';

const userRoute: Router = express.Router();

userRoute.get('/getuser/:userId', getUser);
userRoute.put('/updateuserdeletails/:userId', updateUserDetails);
userRoute.post('/bookcar', BookCar);

export default userRoute;
