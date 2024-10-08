import { authMiddleware } from "./auth";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import path from "path";
import cors from "cors";
import fs from "fs"
import jsonwebtoken from "jsonwebtoken";
require("dotenv").config();
import multer from "multer";
const SECRET_KEY = process.env.SECRET_KEY as string | undefined;
const jwt = jsonwebtoken;
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/profileImage');

    // Check if the directory exists, if not, create it
    fs.mkdir(uploadPath, { recursive: true }, (err:any) => {
      if (err) {
        console.error("Directory creation failed:", err);
        return cb(err, uploadPath);
      }
      console.log(`Upload path: ${uploadPath}`);
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('profileImage'); 
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({
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
      return res.json({
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

    return res.json({
      message: "User Created Successfully!",
      access_token,
      user,
    });

  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      error: "Fields cannot be empty",
    });
  }

  console.log(email, password);

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  
    if (!userExist) {
      return res.json({
        error: "User not found",
      })
    }

    // comment password encryption when using seeded data for signin

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.json({
        error: "Invalid password",
      })
    }
    // comment till here if using seeded data 

    if (userExist) {
      const access_token = await jwt.sign(
        { id: userExist.id, email: userExist.email },
        SECRET_KEY
      );

      return res.json({
        message: "Signin successfully!",
        access_token,
      })
    }

  } catch (error) {
    return res.json({
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
      return res.json({
        error: "Spacename not found",
      });
    }

    // Extract the spacenames from the userspace array
    const spacenames = userWithSpaces.userspace.map((space) => space.spacename);

    return res.json({
      message: "Spacename is retrieved",
      spacenames,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});

app.get("/userspace/:space", async (req, res) => {
  const spacename = req.params.space;

  if (!spacename) {
    return res.json({
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
        questions:true,
        profileImage:true
      }
    });

    if (!userWithSpacename) {
      return res.json({
        error: "Spacename doesn't exist",
      });
    }

    return res.json({
      userWithSpacename,
      message: "Spacename is retrieved",
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});

app.post("/createspace", authMiddleware, async (req, res) => {
  
  console.log("User from request body:", req.body.user); // Add this line in createspace route
  const userId = req.body.user.id;
 // Use multer upload inline inside the route
 upload(req, res, async function (err) {
  if (err) {
    console.error('File upload error:', err);
    return res.json({ error: "File upload failed" });
  }

  const { spacename, title, description, questions } = req.body;

  // Check if the file is uploaded
  if (!req.file) {
    console.error('File not uploaded:', req.file);
    return res.json({ error: "Profile image upload failed" });
  }

  console.log(req.file); // Log uploaded file
  console.log(req.body); // Log request body data

  const profileImageUrl = `/profileImage/${req.file.filename}`; // URL for uploaded image

  // Validate required fields
  if (!spacename || !title || !description || !questions) {
    return res.json({
      error: "Fields are required",
    });
  }

  console.log(userId, spacename, title, description, questions);

  try {
    // Create space in the database
    const parsedQuestions = JSON.parse(questions);

    const spaceExist = await prisma.userspace.findFirst({
      where:{
        spacename:spacename
      }
    })

    if(spaceExist){
      return res
      .json({
        error:"Spacename already exist"
      })
    }

    const space = await prisma.userspace.create({
      data: {
        spacename: spacename.toLowerCase(),
        title: title,
        description: description,
        questions: parsedQuestions,
        userId: userId,
        profileImage: profileImageUrl,
      },
    });

    if (space) {
      return res.json({
        message: "Space created successfully!",
        spacename,
      });
    }
  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});
});

app.post("/createreview", async (req, res) => {
  const { review, stars, name, email, spacename,date } = req.body;

  if (!review || !stars || !name || !email || !spacename) {

    return res.json({
      error: "Fields are required",
    });
  }

  console.log({ review, stars, name, email, spacename, date });

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
      return res.json({
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
        date:date
      },
    });

    return res.json({
      message: "Testimonial created successfully",
    });
  } catch (error) {
    return res.json({
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
        name:true,
        date:true
      }
    }) 

    return res.json({
      message: "Reviews fetched successfully",
      getReview
    });

  } catch (error) {
    return res.json({
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
        date:true
      },
    });

    const space = await prisma.userspace.findFirst({
      where: {
        userId: userId,
      },
      select: {
        spacename: true,
        profileImage:true
      },
    });

    if (!getReview || !space) {
      return res.json({
        error: "reviews not found",
      });
    }

    return res.json({
      message: "Reviews fetched successfully",
      getReview,
      space,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});