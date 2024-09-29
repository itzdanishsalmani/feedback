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
exports.authMiddleware = authMiddleware;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = jsonwebtoken_1.default;
if (!SECRET_KEY) {
    throw new Error("Secret key is required");
}
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const extractedToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
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
        const decodedValue = jwt.verify(token, SECRET_KEY);
        if (!decodedValue) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
        req.body.user = decodedValue;
        next();
    });
}
