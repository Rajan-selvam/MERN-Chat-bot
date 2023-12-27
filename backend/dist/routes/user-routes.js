"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const validators_1 = require("../utils/validators");
const token_manager_1 = require("../utils/token-manager");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controllers_1.getAllUsers);
userRoutes.post("/sign-up", (0, validators_1.validate)(validators_1.signUpValidator), user_controllers_1.signUpUser);
userRoutes.post("/sign-in", (0, validators_1.validate)(validators_1.loginValidator), user_controllers_1.signInUser);
userRoutes.get("/auth-status", token_manager_1.verifyToken, user_controllers_1.checkAuthStatus);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map