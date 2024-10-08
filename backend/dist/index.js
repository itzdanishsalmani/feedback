"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const multer_1 = __importDefault(require("multer"));
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = jsonwebtoken_1.default;
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, '../public/profileImage');
        // Check if the directory exists, if not, create it
        fs_1.default.mkdir(uploadPath, { recursive: true }, (err) => {
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
const upload = (0, multer_1.default)({ storage }).single('profileImage');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, cors_1.default)());
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("server is running");
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({
            error: "Fields cannot be empty",
        });
    }
    const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    console.log(username, email, encryptedPassword);
    try {
        const userExist = yield prisma.user.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
            },
        });
        if (userExist) {
            return res.json({
                error: "User Already Exist",
            });
        }
        const user = yield prisma.user.create({
            data: {
                username: username,
                email: email,
                password: encryptedPassword,
            },
        });
        const access_token = yield jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        return res.json({
            message: "User Created Successfully!",
            access_token,
            user,
        });
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            error: "Fields cannot be empty",
        });
    }
    console.log(email, password);
    try {
        const userExist = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!userExist) {
            return res.json({
                error: "User not found",
            });
        }
        // comment password encryption when using seeded data for signin
        const isPasswordValid = yield bcrypt_1.default.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.json({
                error: "Invalid password",
            });
        }
        // comment till here if using seeded data 
        if (userExist) {
            const access_token = yield jwt.sign({ id: userExist.id, email: userExist.email }, SECRET_KEY);
            return res.json({
                message: "Signin successfully!",
                access_token,
            });
        }
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
app.get("/getspace", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.user.id;
    console.log(userId);
    try {
        const userWithSpaces = yield prisma.user.findUnique({
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
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
app.get("/userspace/:space", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const spacename = req.params.space;
    if (!spacename) {
        return res.json({
            error: "Spacename is required",
        });
    }
    console.log(spacename);
    try {
        const userWithSpacename = yield prisma.userspace.findFirst({
            where: {
                spacename: spacename,
            }, select: {
                title: true,
                description: true,
                questions: true,
                profileImage: true
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
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
app.post("/createspace", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User from request body:", req.body.user); // Add this line in createspace route
    const userId = req.body.user.id;
    // Use multer upload inline inside the route
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const spaceExist = yield prisma.userspace.findFirst({
                    where: {
                        spacename: spacename
                    }
                });
                if (spaceExist) {
                    return res
                        .json({
                        error: "Spacename already exist"
                    });
                }
                const space = yield prisma.userspace.create({
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
            }
            catch (error) {
                return res.json({
                    error: "Internal server error",
                });
            }
        });
    });
}));
app.post("/createreview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { review, stars, name, email, spacename, date } = req.body;
    if (!review || !stars || !name || !email || !spacename) {
        return res.json({
            error: "Fields are required",
        });
    }
    console.log({ review, stars, name, email, spacename, date });
    try {
        const user = yield prisma.userspace.findFirst({
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
        const userId = user === null || user === void 0 ? void 0 : user.userId;
        const newReviews = yield prisma.review.create({
            data: {
                review: review,
                stars: parseInt(stars),
                name: name,
                email: email,
                userId: userId,
                date: date
            },
        });
        return res.json({
            message: "Testimonial created successfully",
        });
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
// new api
app.get("/testimonial/:spacename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const spacename = req.params.spacename;
    console.log(spacename);
    try {
        const userSpacename = yield prisma.userspace.findFirst({
            where: {
                spacename: spacename,
            },
            select: {
                userId: true,
            },
        });
        const extrctedUserId = userSpacename === null || userSpacename === void 0 ? void 0 : userSpacename.userId;
        const getReview = yield prisma.review.findMany({
            where: {
                userId: extrctedUserId
            },
            select: {
                id: true,
                review: true,
                stars: true,
                email: true,
                name: true,
                date: true
            }
        });
        return res.json({
            message: "Reviews fetched successfully",
            getReview
        });
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
app.get("/getreview", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.user.id;
    try {
        const getReview = yield prisma.review.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                review: true,
                name: true,
                email: true,
                stars: true,
                date: true
            },
        });
        const space = yield prisma.userspace.findFirst({
            where: {
                userId: userId,
            },
            select: {
                spacename: true,
                profileImage: true
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
    }
    catch (error) {
        return res.json({
            error: "Internal server error",
        });
    }
}));
const port = 8080;
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
