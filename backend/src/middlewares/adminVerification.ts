import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user || !req.body.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

export default isAdmin;
