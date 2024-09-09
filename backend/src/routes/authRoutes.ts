import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const authRoute: Router = express.Router();

authRoute.post('/register', registerUser).post('/login', loginUser);

export default authRoute;
