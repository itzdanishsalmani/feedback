import { authMiddleware } from "./auth";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import path from "path";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY as string | undefined;
const jwt = jsonwebtoken;
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}

app.get("/", async (req, res) => {
  prisma.user.create;
  res.send("server is running");
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(404).json({
      error: "Fields cannot be empty",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  console.log(username, email, encryptedPassword);

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (userExist) {
      return res.status(401).json({
        error: "User Already Exist",
      });
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: encryptedPassword,
      },
    });

    const access_token = await jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY
    );

    return res.status(200)
    .json({
      message: "User Created Successfully!",
      access_token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      error: "Fields cannot be empty",
    });
  }

  console.log(email, password);

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
        password:password
      },
    });

    if (!userExist) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // comment password encryption when using seeded data for signin

    // const isPasswordValid = await bcrypt.compare(password, userExist.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({
    //     error: "Invalid password",
    //   });
    // }

    if (userExist) {
      const access_token = await jwt.sign(
        { id: userExist.id, email: userExist.email },
        SECRET_KEY
      );

      return res
        .status(200)
        .json({
          message: "Signin successfully!",
          access_token,
        });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/getspace", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;
  console.log(userId);

  try {
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

    if (!userWithSpaces) {
      return res.status(404).json({
        error: "Spacename not found",
      });
    }

    // Extract the spacenames from the userspace array
    const spacenames = userWithSpaces.userspace.map((space) => space.spacename);

    return res.status(200).json({
      message: "Spacename is retrieved",
      spacenames,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/userspace/:space", async (req, res) => {
  const spacename = req.params.space;

  if (!spacename) {
    return res.status(404).json({
      error: "Spacename is required",
    });
  }

  console.log(spacename);

  try {
    const userWithSpacename = await prisma.userspace.findFirst({
      where: {
        spacename: spacename,
      },select:{
        title:true,
        description:true,
        questions:true
      }
    });

    if (!userWithSpacename) {
      return res.status(404).json({
        error: "Spacename doesn't exist",
      });
    }

    return res.status(200).json({
      userWithSpacename,
      message: "Spacename is retrieved",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/createspace", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;

  const { spacename, title, description, questions } = req.body;

  if (!spacename || !title || !description || !questions) {
    return res.status(404).json({
      error: "Fields are required",
    });
  }

  console.log(userId, spacename, title, description, questions);

  try {
    const space = await prisma.userspace.create({
      data: {
        spacename: spacename.toLowerCase(),
        title: title,
        description: description,
        questions: questions,
        userId: userId,
      },
    });

    if (space) {
      return res.status(200).json({
        message: "Space created successfully!",
        spacename,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/createreview", async (req, res) => {
  const { review, stars, name, email, spacename } = req.body;

  if (!review || !stars || !name || !email || !spacename) {
    return res.status(404).json({
      error: "Fields are required",
    });
  }

  console.log({ review, stars, name, email, spacename });

  try {
    const user = await prisma.userspace.findFirst({
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
      message: "Testimonial created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// new api
app.get("/testimonial/:spacename", async (req, res) => {
  const spacename = req.params.spacename
  console.log(spacename)

  try {
    const userSpacename = await prisma.userspace.findFirst({
      where: {
        spacename: spacename,
      },
      select: {
        userId: true,
      },
    });

    const extrctedUserId = userSpacename?.userId

    const getReview = await prisma.review.findMany({
      where:{
        userId:extrctedUserId
      },
      select:{
        id:true,
        review:true,
        stars:true,
        email:true,
        name:true
      }
    }) 

    return res.status(200).json({
      message: "Reviews fetched successfully",
      getReview
    });

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/getreview", authMiddleware, async (req, res) => {
  const userId = req.body.user.id;

  try {
    const getReview = await prisma.review.findMany({
      where: {
        userId: userId,
      },
      select: {
        id:true,
        review: true,
        name: true,
        email: true,
        stars: true,
      },
    });

    const space = await prisma.userspace.findFirst({
      where: {
        userId: userId,
      },
      select: {
        spacename: true,
      },
    });

    if (!getReview || !space) {
      return res.status(404).json({
        error: "reviews not found",
      });
    }

    return res.status(200).json({
      message: "Reviews fetched successfully",
      getReview,
      space,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});