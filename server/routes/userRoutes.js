import userController from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/profile", authMiddleware, userController.getUserProfile);
userRouter.put("/profile", authMiddleware, userController.updateUserProfile);

export default userRouter;
