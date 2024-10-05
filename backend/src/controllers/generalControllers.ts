import { BookingStatus, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const getCar = async (req: Request, res: Response) => {
    const { carId } = req.params; 
    console.log(carId);

    try {
        const car = await prisma.car.findUnique({
            where: { id: parseInt(carId) }, 
            include: {
                features: true, 
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        reviewDate: true,
                        renter: {
                            select: {
                                username: true, 
                            }
                        }
                    }
                }
            }
        });

        if (!car) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        return res.status(StatusCodes.OK).json(car);
    } catch (error) {
        console.error("Error getting car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while getting the car." });
    }
};



export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await prisma.car.findMany();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


