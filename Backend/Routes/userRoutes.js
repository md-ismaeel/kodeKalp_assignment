import express from "express";
import { userLogOut, userLogin, userRegistration } from "../Controller/userController.js";
import authentication from "../Middleware/userAuthentication.js";
import confirmationEmail from "../Middleware/emailConfirmation.js";
const userRouter = express.Router()

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/logout", authentication, userLogOut)
userRouter.get("/confirmEmail/:token", confirmationEmail)

export default userRouter;