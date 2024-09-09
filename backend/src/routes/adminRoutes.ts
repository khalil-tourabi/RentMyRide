import express, { Router } from 'express';
import { getAllUsers } from '../controllers/adminController';
import { tokenVerification } from '../middlewares/tokenVerification';
import isAdmin from '../middlewares/adminVerification';

const adminRoute: Router = express.Router();

adminRoute.get('/getusers', tokenVerification, isAdmin, getAllUsers);

export default adminRoute;
