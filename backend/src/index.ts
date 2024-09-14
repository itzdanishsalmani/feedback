require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY as string | undefined;
import { authMiddleware } from "./auth";
import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser());

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}
app.use(
  cors({
    origin: "*", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.get("/", async (req, res) => {
  prisma.user.create;
  res.send("server is running");
});

app.post("/signup", async (req, res) => {

  const { username, email, password } = req.body;

  if(!username || !email || !password){
    return res.status(404).json({
      error:"Fields cannot be empty"
    })
  }

  console.log(username, email, password);

  try {

    const userExist = await prisma.user.findMany({
      where:{
        username:username,
        email:email
      }
    })

    if(userExist){
      return res.status(411).json({
        error:"User Already Exist"
      })
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  
    const access_token = await jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res.status(200).cookie("access_token", access_token, options).json({
      message: "User Created Successfully!",
    });

  } catch (error) {
    return res.status(500).json({
      error:"Server error"
    })
  }
});

app.get("/getspace", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;
  console.log(userId);

  const userWithSpaces = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      userspace: {
        select: {
          spacename: true,
          userId: true,
        },
      },
    },
  });

  if (!userWithSpaces || !userWithSpaces.userspace) {
    return res.status(404).json({ error: "Spacename not found" });
  }

  // Extract the spacenames from the userspace array
  const spacenames = userWithSpaces.userspace.map((space) => space.spacename);

  return res.json({ spacenames, userId });
});

app.get("/publicspacename/:space", async (req, res) => {

  const spacename = req.params.space;

  if(!spacename){
    return res.status(404).json({
      error:"Spacename is required"
    })
  }

  console.log(spacename);

  try {
    const userWithSpacename = await prisma.userSpace.findFirst({
      where: {
        spacename: spacename,
      },
    });
  
    if (!userWithSpacename) {
      return res.status(404).json({
        error: "Spacename doesn't exist",
      });
    }
  
    return res.status(200).json({ 
      userWithSpacename,
      message: "Spacename is retrieved" 
    });

  } catch (error) {

    return res.status(500).json({
      error:"Server error"
    })
  }
  
});

app.post("/createspace", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;

  const { spacename, title, description, questions } = req.body;

  if(!spacename || !title || !description || !questions){
    return res.status(404).json({
      error:"Fields are required"
    })
  }

  console.log(userId, spacename, title, description, questions);

  try {

    const space = await prisma.userSpace.create({
      data: {
        spacename: spacename,
        title: title,
        description: description,
        questions: questions,
        userId: userId,
      },
    });

    return res.status(200).json({
      space,
      message:"Space created successfully!"
    });

  } catch (error) {
    return res.status(500).json({
      message:"Server error"
    })
  }

});

app.post("/review", async (req, res) => {
  const { review, stars, name, email, spacename } = req.body;

  if(!review || !stars || !name || !email || !spacename){
    return res.status(404).json({
      error:"Fields are required"
    })
  }

  console.log({ review, stars, name, email, spacename });
  
try {

  const user = await prisma.userSpace.findFirst({
    where: {
      spacename: spacename,
    },
    select: {
      userId: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const userId = user?.userId;

  const newReviews = await prisma.review.create({
    data: {
      review: review,
      stars: parseInt(stars),
      name: name,
      email: email,
      userId: userId,
    },
  });

  return res.status(200).json({
    newReviews,
    msg: "Testimonial created successfully",
  });

} catch (error) {

  return res.status(500).json({
    error:"Server error"
  })
}

});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
