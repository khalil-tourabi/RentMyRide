import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function tokenVerification(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authorization.split(" ")[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;

        if (!secret) {
            throw new Error("JWT secret is not defined");
        }

        const user = jwt.verify(token, secret);

        req.body.user = user as jwt.JwtPayload;

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
