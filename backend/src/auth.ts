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
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  const decodedValue = jwt.verify(token, SECRET_KEY) as MyJwtPayload;

  req.body.user = decodedValue;
  next();
}

//seed

// import { PrismaClient } from "@prisma/client";
// import { users } from "./users";

// const prisma = new PrismaClient();

// async function main() {
//     for(let user of users){
//         await prisma.user.create({
//             data:user
//         })
//     }
// }

// main().catch(e=>{
//     console.log(e);
//     process.exit(1)
// }).finally(()=>{
//     prisma.$disconnect()
// })

// users

// export const users = [
//     {
//     username:"danish",
//     email:"danish@gmail.com",          
//     password:"password"
// },
//     {
//         username:"danish1",
//         email:"danish@gmail1.com",          
//         password:"password1"
//     }
// ]

// export const userspaces = [ {
//     spacename:"iron-man",   
//     title:"testimonial",       
//     description:"give review for the web application",
//     questions:[{
//         question1:"Have you like the testimonial project"
//     }]   
//   }]
  
//   export const reviews = [{
//     review:"I like your product", 
//     name:"Professor",   
//     email:"professor@moneyheist.com",  
//     stars:"5"  
//   } ]