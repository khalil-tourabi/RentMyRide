import { BookingStatus, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while getting the user." });
    }
}

export const updateUserDetails = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { username, email, phone, firstName, lastName, idNumber, address, city, country, zipCode } = req.body;
    
    // Validate required fields
    if (!username || !email || !phone || !firstName || !lastName || !idNumber || !address || !city || !country || !zipCode) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required." });
    }

    try {
        // Update user details
        const user = await prisma.user.update({
            where: { id: userId },
            data: { username, email, phone },
        });

        // Update profile details
        const profile = await prisma.profile.upsert({
            where: { userId: userId },
            update: { firstName, lastName, idNumber, address, city, country, zipCode },
            create: { userId, firstName, lastName, idNumber, address, city, country, zipCode },
        });

        return res.status(StatusCodes.OK).json({ user, profile });
    } catch (error) {
        console.error("Error updating user details:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while updating the user details." });
    }
};

export const BookCar = async (req: Request, res: Response) => {
    const { carId, renterId, startDate, endDate, paymentMethod, deliveryAddress, returnAddress, deliveryTime, returnTime } = req.body;

    // Validate required fields
    if (!carId || !renterId || !startDate || !endDate || !paymentMethod) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required." });
    }

    // Check if the dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "End date must be after start date." });
    }

    try {
        // Check if the car is available for the given dates
        const existingBookings = await prisma.booking.findMany({
            where: {
                carId,
                status: { not: BookingStatus.CANCELLED },
                OR: [
                    {
                        startDate: { lte: end }, // Existing booking starts before or on the end date
                        endDate: { gte: start }, // Existing booking ends after or on the start date
                    },
                ],
            },
        });

        if (existingBookings.length > 0) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Car is already booked for the selected dates." });
        }

        // Calculate total amount (you may want to customize this calculation)
        const car = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!car) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        const totalAmount = car.dailyPrice * ((end.getTime() - start.getTime()) / (1000 * 3600 * 24)); // Calculate days

        // Create the booking
        const booking = await prisma.booking.create({
            data: {
                carId,
                renterId,
                startDate: start,
                endDate: end,
                totalAmount,
                paymentMethod,
                deliveryAddress,
                returnAddress,
                deliveryTime,
                returnTime,
                status: BookingStatus.PENDING,
            },
        });

        return res.status(StatusCodes.CREATED).json(booking);
    } catch (error) {
        console.error("Error booking car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while booking the car." });
    }
};

export const addReview = async (req: Request, res: Response) => {
    const { carId, renterId, rating, comment } = req.body;

    // Validate required fields
    if (typeof rating !== 'number' || rating < 1 || rating > 5 || !carId || !renterId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid input. Rating must be between 1 and 5 and other fields are required." });
    }

    try {
        // Create a new review
        const review = await prisma.review.create({
            data: {
                carId,
                renterId,
                rating,
                comment,
            },
        });

        return res.status(StatusCodes.CREATED).json(review);
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while adding the review." });
    }
};

export const getCarReview = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.carId);

    try {
        const reviews = await prisma.review.findMany({
            where: { carId },
            include: {
                renter: true,
                car: true,
            }
        });

        return res.status(StatusCodes.OK).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching reviews." });
    }
};
