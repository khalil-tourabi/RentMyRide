import express, { Router } from 'express';
import { getUser, updateUserDetails, BookCar, addReview, getCarReview } from '../controllers/userController';
import { tokenVerification } from '../middlewares/tokenVerification';
import isClient from '../middlewares/userVerification';

const userRoute: Router = express.Router();

userRoute.get('/getuser/:userId', tokenVerification, isClient, getUser);
userRoute.put('/updateuserdeletails/:userId', tokenVerification, isClient, updateUserDetails);
userRoute.post('/bookcar', tokenVerification, isClient, BookCar);
userRoute.post('/addreview', tokenVerification, isClient, addReview);
userRoute.get('/getreview/:carId', tokenVerification, isClient, getCarReview);

export default userRoute;
