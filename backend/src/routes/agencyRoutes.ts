import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars, updateCar, confirmBooking, cancelBooking, getUserProfile, updateUserProfile, getAgencyCars, getBookings } from '../controllers/AgencyController';
import upload from '../middlewares/multer';
import { tokenVerification } from '../middlewares/tokenVerification';
import isAgency from '../middlewares/agencyVerification';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', tokenVerification, isAgency, upload.single('image'), addCar);
agencyRoute.delete('/deletecar/:carId', tokenVerification, isAgency, deleteCar);
agencyRoute.post('/getcar', tokenVerification, isAgency, getCar);
agencyRoute.get('/getagencycars/:userId', tokenVerification, isAgency, getAgencyCars);
agencyRoute.get('/getallcars', tokenVerification, isAgency, getAllCars);
agencyRoute.put('/updatecar/:carId', tokenVerification, isAgency, upload.single('image'), updateCar);
agencyRoute.post('/confirmbooking/:bookingId', tokenVerification, isAgency, confirmBooking);
agencyRoute.post('/cancelbooking/:bookingId', tokenVerification, isAgency, cancelBooking);
agencyRoute.get('/getagencyprofile/:userId', tokenVerification, isAgency, getUserProfile);
agencyRoute.put('/updateagencyprofile/:userId', tokenVerification, isAgency, updateUserProfile);
agencyRoute.get('/getbookingbyagency', tokenVerification, isAgency, getBookings);

export default agencyRoute;