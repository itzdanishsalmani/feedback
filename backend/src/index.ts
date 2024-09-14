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
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

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

  const access_token = await jwt.sign(
    { id: result.id, username: result.username },
    SECRET_KEY
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("access_token", access_token, options).json({
    msg: "Account Created",
  });
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
    return res.status(404).json({ err: "No spaces found" });
  }

  // Extract the spacenames from the userspace array
  const spacenames = userWithSpaces.userspace.map((space) => space.spacename);

  return res.json({ spacenames, userId });
});

app.get("/publicspacename/:space", async (req, res) => {
  const spacename = req.params.space;
  console.log(spacename);
  const userWithSpaces = await prisma.userSpace.findFirst({
    where: {
      spacename: spacename,
    },
  });

  if (!userWithSpaces) {
    return res.json({
      err: "Spacename doesn't exist",
    });
  }

  return res.json({ userWithSpaces, msg: "Finded" });
});

app.post("/createspace", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;

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

app.post("/review", async (req, res) => {
  const { review, stars, name, email, spacename } = req.body;

  console.log({ review, stars, name, email, spacename });

  const user = await prisma.userSpace.findFirst({
    where: {
      spacename: spacename,
    },
    select: {
      userId: true,
    },
  });

  if (!user) {
    return res.json({
      err: "user not found",
    });
  }

  const userId = user?.userId;

  if (!userId) {
    return res.json({
      err: "error",
    });
  }

  const newReviews = await prisma.review.create({
    data: {
      review: review,
      stars: parseInt(stars),
      name: name,
      email: email,
      userId: userId,
    },
  });

  return res.json({
    newReviews,
    msg: "created",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
