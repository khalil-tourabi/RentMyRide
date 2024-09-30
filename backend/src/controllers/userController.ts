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

export const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: String(email) }, // Ensure the email is of type string
            select: {
                id: true,
                userType: true, // Return the user type (ADMIN, CLIENT, AGENCY)
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user's ID and userType
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserBookings = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);  // Ensure userId is a number
    if (isNaN(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
    }

    try {
        const bookings = await prisma.booking.findMany({
            where: { renterId: userId },  // Link userId to renterId
            include: {
                car: {  // Include car details for each booking
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        year: true,
                        dailyPrice: true,
                    }
                }
            }
        });

        if (bookings.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No bookings found for this user." });
        }

        return res.status(StatusCodes.OK).json(bookings);  // Send the bookings with car details
    } catch (error) {
        console.error("Error getting user bookings:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while getting the user bookings." });
    }
};


export const getUserReviews = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);  // Ensure userId is a number
    if (isNaN(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
    }

    try {
        const reviews = await prisma.review.findMany({
            where: { renterId: userId },  // Ensure 'renterId' is the correct field
            include: {                    // Include related car details
                car: {
                    select: {              // Select specific fields to return
                        id: true,
                        brand: true,
                        model: true,
                    }
                }
            },
        });

        return res.status(StatusCodes.OK).json(reviews);  // Send the reviews with car details as response
    } catch (error) {
        console.error("Error getting user reviews:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while getting the user reviews." });
    }
}


export const getUserProfile = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);  // Extract the user ID from request params

    if (isNaN(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
    }

    try {
        // Query to find user data
        const user = await prisma.user.findUnique({
            where: { id: userId },  // Assuming 'id' is the primary key for users
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                userType: true   // Include fields you want to return in the user profile
            }
        });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        // Separate query to find profile data
        const profile = await prisma.profile.findUnique({
            where: { userId: userId },  // Assuming 'userId' is the foreign key in the profile table
            select: {
                firstName: true,
                lastName: true,
                idNumber: true,
                address: true,
                city: true,
                country: true,
                zipCode: true
            }
        });

        if (!profile) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Profile not found" });
        }

        // Combine the user and profile data in the response
        return res.status(StatusCodes.OK).json({
            user,
            profile
        });
    } catch (error) {
        console.error("Error fetching user or profile:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching the user profile." });
    }
};

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
