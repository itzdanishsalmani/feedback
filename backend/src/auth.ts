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

  const extractedToken = authHeader?.split(" ")[1];

  if (extractedToken === "null") {
    return res.status(401).json({
      error: "Unauthorized user",
    });
  }

  const token = extractedToken;

  if (!token) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  const decodedValue = jwt.verify(token, SECRET_KEY) as MyJwtPayload;

  if (!decodedValue) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  
  req.body.user = decodedValue;

  next();
}