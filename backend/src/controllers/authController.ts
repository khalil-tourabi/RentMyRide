import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import generateToken from '../utils/jwt';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, phone, userType } = req.body;

    if (!username || !email || !password || !phone || !userType) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword, phone, userType }
        });

        const token = generateToken({ user: newUser }, process.env.ACCESS_TOKEN_SECRET);

        res.status(StatusCodes.CREATED).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ user }, process.env.ACCESS_TOKEN_SECRET);

        res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
