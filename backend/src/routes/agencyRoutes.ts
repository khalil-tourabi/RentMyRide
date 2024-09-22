import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars, updateCar, confirmBooking, cancelBooking, getAllBookings, getBookingsByStatus } from '../controllers/AgencyController';
import upload from '../middlewares/multer';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', upload.single('image'), addCar);
agencyRoute.post('/deletecar/:carId', deleteCar);
agencyRoute.post('/getcar', getCar);
agencyRoute.get('/getallcars', getAllCars);
agencyRoute.put('/updatecar/:carId', upload.single('image'), updateCar);
agencyRoute.post('/confirmbooking/:bookingId', confirmBooking);
agencyRoute.post('/cancelbooking/:bookingId', cancelBooking);
agencyRoute.get('/getbookingsbystatus/:status', getBookingsByStatus);

export default agencyRoute;