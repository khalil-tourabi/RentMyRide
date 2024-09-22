import express, { Router } from 'express';
import { getUser, updateUserDetails, BookCar, addReview, getCarReview } from '../controllers/userController';

const userRoute: Router = express.Router();

userRoute.get('/getuser/:userId', getUser);
userRoute.put('/updateuserdeletails/:userId', updateUserDetails);
userRoute.post('/bookcar', BookCar);
userRoute.post('/addreview', addReview);
userRoute.get('/getreview/:carId', getCarReview);

export default userRoute;
