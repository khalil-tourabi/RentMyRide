import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const addCar = async (req: Request, res: Response) => {
    const {
        ownerId,
        brand,
        model,
        year,
        mileage,
        description,
        dailyPrice,
        availableFrom,
        availableTo
    } = req.body;

    // Validate required fields
    if (!ownerId || !brand || !model || !year || !dailyPrice || !availableFrom || !availableTo) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields." });
    }

    try {
        // Create a new car entry
        const newCar = await prisma.car.create({
            data: {
                ownerId,
                brand,
                model,
                year,
                mileage: mileage || 0, // Default to 0 if mileage is not provided
                description: description || null,
                dailyPrice,
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
            },
        });

        return res.status(StatusCodes.CREATED).json(newCar);
    } catch (error) {
        console.error("Error adding car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while adding the car." });
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    const { carId } = req.body;

    try {
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        })

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        const deletedCar = await prisma.car.delete({
            where: { id: carId },
        });

        return res.status(StatusCodes.OK).json(deletedCar);
    } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while deleting the car." });
    }
}

export const getCar = async (req: Request, res: Response) => {
    const { carId } = req.body;
    try {
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        })

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        const car = await prisma.car.findUnique({
            where: { id: carId },
        })
        return res.status(StatusCodes.OK).json(car);
    } catch (error) {
        console.error("Error getting car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while getting the car." });
    }
}

export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await prisma.car.findMany();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}