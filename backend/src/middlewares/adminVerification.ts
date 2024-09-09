import { Request, Response, NextFunction } from "express";
import { UserType } from "@prisma/client";

interface User {
  userType: UserType;
}

interface CustomRequest extends Request {
  body: {
    user?: User;
  };
}

const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.body.user;
  console.log(user);
  if (!user || user.userType === UserType.ADMIN) {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

export default isAdmin;
