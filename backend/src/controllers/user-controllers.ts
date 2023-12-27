import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager";
import { COOKIE_NAME } from "../utils/constants";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Success",
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      message: "Something Went wrong at Server",
      cause: error.message,
    });
  }
};

export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(401).send("User Already Registered!");
    const hashedPassword = await hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(new Date().getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
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
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Something Went wrong at Server",
      cause: error.message,
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User Not Yet Registered!");
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Password Mistmatched");

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(new Date().getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
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
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something Went wrong at Server",
      cause: error.message,
    });
  }
};

export const checkAuthStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send("User Not Yet Registered! or Token malfunctioned");
    if(user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Credentials doesn't Match");
    }
    return res.status(200).json({
      message: "Success",
      // id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something Went wrong at Server",
      cause: error.message,
    });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};