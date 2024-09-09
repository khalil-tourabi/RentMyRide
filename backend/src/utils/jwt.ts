import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user:any, secretKey:any) => {
  const token = jwt.sign(user, secretKey,{ expiresIn: "1h" });
  return token;
}

export default generateToken;