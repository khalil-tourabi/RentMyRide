import { BookingStatus, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const addCar = async (req: Request, res: Response): Promise<Response> => {
    const {
        ownerId,
        brand,
        model,
        year,
        mileage,
        description,
        dailyPrice,
        availableFrom,
        availableTo,
    } = req.body;

    if (!ownerId || !brand || !model || !year || !dailyPrice || !availableFrom || !availableTo) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields." });
    }

    // Check if an image was uploaded
    const image = req.file; // multer adds the uploaded file to req.file
    if (!image) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Image upload is required." });
    }

    try {
        const newCar = await prisma.car.create({
            data: {
                ownerId: parseInt(ownerId),
                brand,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage) || 0,
                description: description || null,
                dailyPrice : parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: image.path,
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
    const carId = parseInt(req.params.carId);

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

export const updateCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.carId);

    const {
        brand,
        model,
        year,
        mileage,
        description,
        dailyPrice,
        availableFrom,
        availableTo
    } = req.body;

    // Handle the uploaded file if available
    const imageUrl = req.file ? req.file.path : undefined; // Assuming the file URL is stored in req.file.path

    try {
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        const updatedCar = await prisma.car.update({
            where: { id: carId },
            data: {
                brand,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage) || 0,
                description: description || null,
                dailyPrice : parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: imageUrl || carExists.image,
            },
        });

        return res.status(StatusCodes.OK).json(updatedCar);
    } catch (error) {
        console.error("Error updating car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while updating the car." });
    }
};

export const confirmBooking = async (req: Request, res: Response) => {
    const bookingId = parseInt(req.params.bookingId);

    try {
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.CONFIRMED },
        });

        return res.status(StatusCodes.OK).json(booking);
    } catch (error) {
        console.error("Error confirming booking:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while confirming the booking." });
    }
};

export const cancelBooking = async (req: Request, res: Response) => {
    const bookingId = parseInt(req.params.bookingId);

    try {
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.CANCELLED },
        });

        return res.status(StatusCodes.OK).json(booking);
    } catch (error) {
        console.error("Error canceling booking:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while canceling the booking." });
    }
};

export const getBookingsByStatus = async (req: Request, res: Response) => {
    const status = req.params.status as BookingStatus | "ALL";

    if (status !== "ALL" && !Object.values(BookingStatus).includes(status as BookingStatus)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status value." });
    }

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                status: status === "ALL" ? undefined : status as BookingStatus,
            },
            include: {
                car: true,
                renter: true
            }
        });

        return res.status(StatusCodes.OK).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching bookings." });
    }
};