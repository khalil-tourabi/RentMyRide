import express, { Router } from 'express';
import { addCar, deleteCar, getCar, getAllCars } from '../controllers/AgencyController';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', addCar);
agencyRoute.post('/deletecar', deleteCar);
agencyRoute.post('/getcar', getCar);
agencyRoute.get('/getallcars', getAllCars);

export default agencyRoute;
