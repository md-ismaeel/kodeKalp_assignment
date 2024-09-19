import { userModel } from "../Model/userModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

const secretKey = process.env.SECRET_KEY;

export default async function confirmationEmail(req, res) {
    const { token } = req.params;
    // console.log("token", token);
    try {
        const decoded = jwt.verify(token, secretKey);

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "unAuthorized user not found!!"
            })
        }

        if (user.confirm) {
            return res.status(400).json({
                success: false,
                message: "email is already confirmed!"
            });
        }

        user.confirm = true,
            await user.save()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }

}