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
        features, // Added features from the request body
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
        // Create the car entry
        const newCar = await prisma.car.create({
            data: {
                ownerId: parseInt(ownerId),
                brand,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage) || 0,
                description: description || null,
                dailyPrice: parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: image.path,
            },
        });

        // Create car features if provided
        if (features && features.length > 0) {
            const carFeatures = features.map((feature: string) => ({
                carId: newCar.id,
                name: feature,
            }));
            await prisma.carFeature.createMany({
                data: carFeatures,
            });
        }

        return res.status(StatusCodes.CREATED).json(newCar);
    } catch (error) {
        console.error("Error adding car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while adding the car." });
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.carId); // Extract car ID from request parameters

    try {
        // Check if the car exists before trying to delete it
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        // Delete associated bookings first
        await prisma.booking.deleteMany({
            where: { carId: carId },
        });

        // Delete associated reviews
        await prisma.review.deleteMany({
            where: { carId: carId },
        });

        // Optionally, delete associated features as well
        await prisma.carFeature.deleteMany({
            where: { carId: carId },
        });

        // Now delete the car
        await prisma.car.delete({
            where: { id: carId },
        });

        return res.status(StatusCodes.OK).json({ message: "Car deleted successfully." });
    } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while deleting the car." });
    }
};


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
        availableTo,
        features, // Include features from the request body
    } = req.body;

    // Handle the uploaded file if available
    const imageUrl = req.file ? req.file.path : undefined;

    try {
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        // Update car details
        const updatedCar = await prisma.car.update({
            where: { id: carId },
            data: {
                brand,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage) || 0,
                description: description || null,
                dailyPrice: parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: imageUrl || carExists.image, // Use existing image if no new image provided
            },
        });

        // Update car features
        if (features && features.length > 0) {
            // Remove existing features
            await prisma.carFeature.deleteMany({
                where: { carId: carId },
            });

            // Add new features
            const carFeatures = features.map((feature: string) => ({
                carId: updatedCar.id,
                name: feature,
            }));
            await prisma.carFeature.createMany({
                data: carFeatures,
            });
        }

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

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { Profile: true },
        });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }

        const Agency = await prisma.agency.findFirst({
            where: { userId },
        });

        res.status(StatusCodes.OK).json({ user, profile: user.Profile, agency: Agency });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching the user profile." });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { profileData, agencyData } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }

        // Check if the profile exists
        let updatedProfile;
        const existingProfile = await prisma.profile.findUnique({ where: { userId } });

        if (existingProfile) {
            updatedProfile = await prisma.profile.update({
                where: { userId: userId },
                data: {
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    idNumber: profileData.idNumber,
                    address: profileData.address,
                    city: profileData.city,
                    country: profileData.country,
                    zipCode: profileData.zipCode,
                },
            });
        } else {
            // Create a new profile if it doesn't exist
            updatedProfile = await prisma.profile.create({
                data: {
                    userId: userId,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    idNumber: profileData.idNumber,
                    address: profileData.address,
                    city: profileData.city,
                    country: profileData.country,
                    zipCode: profileData.zipCode,
                },
            });
        }

        // Handle agency data
        if (agencyData.name) {
            const existingAgency = await prisma.agency.findUnique({
                where: { email: agencyData.email },
            });

            if (existingAgency) {
                // Update the existing agency
                await prisma.agency.update({
                    where: { id: existingAgency.id },
                    data: agencyData,
                });
            } else {
                // Create a new agency
                await prisma.agency.create({
                    data: { ...agencyData, userId: userId },
                });
            }
        }

        res.status(StatusCodes.OK).json({ profile: updatedProfile });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while updating the user profile." });
    }
};

export const getAgencyCars = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId); // Get userId from the request params

    try {
        const cars = await prisma.car.findMany({
            where: { ownerId: userId }, // Find cars where ownerId matches the userId
            include: {
                features: true, // Include features if needed
            },
        });

        if (!cars.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No cars found for this user." });
        }

        return res.status(StatusCodes.OK).json(cars);
    } catch (error) {
        console.error("Error fetching agency cars:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching the cars." });
    }
};
