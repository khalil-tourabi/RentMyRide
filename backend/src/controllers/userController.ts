import { PrismaClient } from '@prisma/client';
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
