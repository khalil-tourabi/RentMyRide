import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars, updateCar } from '../controllers/AgencyController';
import upload from '../middlewares/multer';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', upload.single('image'), addCar);
agencyRoute.post('/deletecar/:carId', deleteCar);
agencyRoute.post('/getcar', getCar);
agencyRoute.get('/getallcars', getAllCars);
agencyRoute.put('/updatecar/:carId', upload.single('image'), updateCar);

export default agencyRoute;