import express, { Router } from 'express';
import { getUser, getUserByEmail, updateUserDetails, BookCar, addReview, getCarReview, getUserBookings, getUserReviews, getUserProfile } from '../controllers/userController';
import { tokenVerification } from '../middlewares/tokenVerification';
import isClient from '../middlewares/userVerification';

const userRoute: Router = express.Router();

userRoute.get('/getuser/:userId', tokenVerification, isClient, getUser);
userRoute.put('/updateuserdetails/:userId', tokenVerification, isClient, updateUserDetails);
userRoute.post('/bookcar', tokenVerification, isClient, BookCar);
userRoute.post('/addreview', tokenVerification, isClient, addReview);
userRoute.get('/getreview/:carId', tokenVerification, isClient, getCarReview);
userRoute.get("/userbyemail", getUserByEmail);
userRoute.get("/getuserbookings/:userId", getUserBookings);
userRoute.get("/getuserreviews/:userId", getUserReviews);
userRoute.get('/getuserprofile/:userId', tokenVerification, isClient, getUserProfile);
export default userRoute;
