require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY as string;
const jwt = jsonwebtoken;

interface MyJwtPayload extends JwtPayload {
  id: number;
}

if (!SECRET_KEY) {
  throw new Error("Secret key is required");
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  const token = authHeader?.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  const decodedValue = jwt.verify(token, SECRET_KEY) as MyJwtPayload;

  req.body.user = decodedValue;

  next();
}