require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY as string | undefined;
import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { JwtPayload } from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

interface MyJwtPayload extends JwtPayload {
    id: number;
  }
  
app.get("/", async (req, res) => {
  prisma.user.create;
  res.send("server is running");
});

app.post("/user", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  const result = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  const access_token = await jwt.sign({ id: result.id }, SECRET_KEY);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("access_token", access_token, options).json({
    msg: "Account Created",
  });
});

app.get("/getspace",async(req,res)=>{
    const token = req.cookies.access_token 

    if(!token){
        return res.json({
            err:"Unauthorize"
        })
    }

    const decodedvalue = jwt.verify(token, SECRET_KEY) as MyJwtPayload; // Cast to custom type

    const userId = decodedvalue.id

    const userWithSpaces = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          userspace: {
            select: {
              spacename: true,
            },
          },
        },
      });
    
      if (!userWithSpaces || !userWithSpaces.userspace) {
        return res.status(404).json({ err: "No spaces found" });
      }
    
      // Extract the spacenames from the userspace array
      const spacenames = userWithSpaces.userspace.map(space => space.spacename);
    
      return res.json({ spacenames });
    });
    
app.post("/createspace", async (req, res) => {
    const token = req.cookies.access_token 

    if(!token){
        return res.json({
            err:"Unauthorize"
        })
    }

    const decodedvalue = jwt.verify(token, SECRET_KEY) as MyJwtPayload; // Cast to custom type

    const userId = decodedvalue.id

  const { spacename, title, description, questions } = req.body;
  console.log(userId, spacename, title, description, questions);
  const result = await prisma.userSpace.create({
    data: {
      spacename: spacename,
      title: title,
      description: description,
      questions: questions,
      userId: userId,
    },
  });
  res.json({
    result,
  });
});

app.post('/review',async(req,res)=>{
  const token = req.cookies.access_token 

    if(!token){
        return res.json({
            err:"Unauthorize"
        })
    }

    const decodedvalue = jwt.verify(token, SECRET_KEY) as MyJwtPayload; // Cast to custom type

    const userId = decodedvalue.id

    const {review,stars,name,email} = req.body

    console.log({review,stars,name,email})

    const reviews = await prisma.review.create({

      data:{
        review:review,
        stars:stars,
        name:name,
        email:email,
        userId:userId
      }
    })

    return res.json({
      reviews,
      msg:"created"
    })
})

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
