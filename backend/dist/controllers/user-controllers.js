"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthStatus = exports.signInUser = exports.signUpUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt");
const token_manager_1 = require("../utils/token-manager");
const constants_1 = require("../utils/constants");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find();
        return res.status(200).json({
            message: "Success",
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Something Went wrong at Server",
            cause: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
const signUpUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User_1.default.findOne({ email });
        if (userExist)
            return res.status(401).send("User Already Registered!");
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(new Date().getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({
            message: "Success",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Something Went wrong at Server",
            cause: error.message,
        });
    }
};
exports.signUpUser = signUpUser;
const signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).send("User Not Yet Registered!");
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect)
            return res.status(403).send("Password Mistmatched");
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(new Date().getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "Success",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Something Went wrong at Server",
            cause: error.message,
        });
    }
};
exports.signInUser = signInUser;
const checkAuthStatus = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User Not Yet Registered! or Token malfunctioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Credentials doesn't Match");
        }
        return res.status(200).json({
            message: "Success",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Something Went wrong at Server",
            cause: error.message,
        });
    }
};
exports.checkAuthStatus = checkAuthStatus;
//# sourceMappingURL=user-controllers.js.map