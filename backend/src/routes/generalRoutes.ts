import express, { Router } from 'express';
import { getCar, getAllCars } from '../controllers/generalControllers';

const generalRoute: Router = express.Router();

generalRoute.get(`/getallagenciescars`, getAllCars).get(`/getonecar/:carId`, getCar);

export default generalRoute;
