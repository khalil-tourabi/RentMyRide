import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars, updateCar } from '../controllers/AgencyController';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', addCar);
agencyRoute.post('/deletecar/:carId', deleteCar);
agencyRoute.post('/getcar', getCar);
agencyRoute.get('/getallcars', getAllCars);
agencyRoute.put('/updatecar/:carId', updateCar);

export default agencyRoute;