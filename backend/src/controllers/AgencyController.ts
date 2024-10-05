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
        features,
    } = req.body;

    if (!ownerId || !brand || !model || !year || !dailyPrice || !availableFrom || !availableTo) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields." });
    }

    
    const image = req.file;
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
                dailyPrice: parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: image.path,
            },
        });

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
    const carId = parseInt(req.params.carId);

    try {
        const carExists = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!carExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Car not found." });
        }

        await prisma.booking.deleteMany({
            where: { carId: carId },
        });

        await prisma.review.deleteMany({
            where: { carId: carId },
        });

        await prisma.carFeature.deleteMany({
            where: { carId: carId },
        });

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
        features, 
    } = req.body;

    const imageUrl = req.file ? req.file.path : undefined;

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
                dailyPrice: parseFloat(dailyPrice),
                availableFrom: new Date(availableFrom),
                availableTo: new Date(availableTo),
                image: imageUrl || carExists.image,
            },
        });

        if (features && features.length > 0) {
            await prisma.carFeature.deleteMany({
                where: { carId: carId },
            });

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

        if (agencyData.name) {
            const existingAgency = await prisma.agency.findUnique({
                where: { email: agencyData.email },
            });

            if (existingAgency) {
                await prisma.agency.update({
                    where: { id: existingAgency.id },
                    data: agencyData,
                });
            } else {
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
    const userId = parseInt(req.params.userId);

    try {
        const cars = await prisma.car.findMany({
            where: { ownerId: userId },
            include: {
                features: true,
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

export const getBookings = async (req: Request, res: Response) => {
    try {
        const userId  = parseInt(req.params.userId);

        const agency = await prisma.agency.findFirst({
            where: { userId },
            select: {
                id: true, 
            },
        });

        if (!agency) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Agency not found." });
        }

        const bookings = await prisma.booking.findMany({
            where: { agencyId: agency.id }, 
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