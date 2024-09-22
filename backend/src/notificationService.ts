import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host:"smtp.zoho.com",
    port:465,
    secure:true,
    auth:{
        user: process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
})

export const sendEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendBookingConfirmation = async (bookingId: number) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                renter: true,
                car: true,
            },
        });

        if (!booking) {
            throw new Error('Booking not found.');
        }

        const emailSubject = 'Booking Confirmation';
        const emailText = `
            Dear ${booking.renter.username},
            Your booking for the car ${booking.car.brand} ${booking.car.model} has been confirmed.
            Booking Details:
            Start Date: ${booking.startDate}
            End Date: ${booking.endDate}
            Total Amount: ${booking.totalAmount}
        `;

        await sendEmail(booking.renter.email, emailSubject, emailText);
    } catch (error) {
        console.error('Error sending booking confirmation:', error);
    }
};

export const sendBookingStatusUpdate = async (bookingId: number, newStatus: string) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                renter: true,
                car: true,
            },
        });

        if (!booking) {
            throw new Error('Booking not found.');
        }

        const emailSubject = 'Booking Status Update';
        const emailText = `
            Dear ${booking.renter.username},
            Your booking for the car ${booking.car.brand} ${booking.car.model} has been updated.
            New Status: ${newStatus}
        `;

        await sendEmail(booking.renter.email, emailSubject, emailText);
    } catch (error) {
        console.error('Error sending booking status update:', error);
    }
};

export const sendSystemEventNotification = async (userId: number, event: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found.');
        }

        const emailSubject = 'Important System Notification';
        const emailText = `
            Dear ${user.username},
            There has been an important event: ${event}.
        `;

        await sendEmail(user.email, emailSubject, emailText);
    } catch (error) {
        console.error('Error sending system event notification:', error);
    }
};
