import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars, updateCar, confirmBooking, cancelBooking, getBookingsByStatus, getUserProfile, updateUserProfile } from '../controllers/AgencyController';
import upload from '../middlewares/multer';
import { tokenVerification } from '../middlewares/tokenVerification';
import isAgency from '../middlewares/agencyVerification';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', tokenVerification, isAgency, upload.single('image'), addCar);
agencyRoute.post('/deletecar/:carId', tokenVerification, isAgency, deleteCar);
agencyRoute.post('/getcar', tokenVerification, isAgency, getCar);
agencyRoute.get('/getallcars', tokenVerification, isAgency, getAllCars);
agencyRoute.put('/updatecar/:carId', tokenVerification, isAgency, upload.single('image'), updateCar);
agencyRoute.post('/confirmbooking/:bookingId', tokenVerification, isAgency, confirmBooking);
agencyRoute.post('/cancelbooking/:bookingId', tokenVerification, isAgency, cancelBooking);
agencyRoute.get('/getbookingsbystatus/:status', tokenVerification, isAgency, getBookingsByStatus);
agencyRoute.get('/getagencyprofile/:userId', tokenVerification, isAgency, getUserProfile);
agencyRoute.put('/updateagencyprofile/:userId', tokenVerification, isAgency, updateUserProfile);

export default agencyRoute;