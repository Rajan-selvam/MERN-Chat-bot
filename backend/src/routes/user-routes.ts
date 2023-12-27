import { Router } from "express";
import {
  getAllUsers,
  signUpUser,
  signInUser,
  checkAuthStatus,
  userLogout,
} from "../controllers/user-controllers";
import { loginValidator, signUpValidator, validate } from "../utils/validators";
import { verifyToken } from "../utils/token-manager";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/sign-up", validate(signUpValidator), signUpUser);
userRoutes.post("/sign-in", validate(loginValidator), signInUser);
userRoutes.get("/auth-status", verifyToken, checkAuthStatus);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
