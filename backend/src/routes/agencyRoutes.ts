import express, { Router } from 'express';
import { addCar, deleteCar } from '../controllers/AgencyController';

const agencyRoute: Router = express.Router();

agencyRoute.post('/addcar', addCar);
agencyRoute.post('/deletecar', deleteCar);

export default agencyRoute;
