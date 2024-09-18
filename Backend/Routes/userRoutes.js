import express from "express";
import { userLogOut, userLogin, userRegistration } from "../Controller/userController.js";
import authentication from "../Middleware/userAuthentication.js";
const userRouter = express.Router()

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/logout", authentication, userLogOut)

export default userRouter;