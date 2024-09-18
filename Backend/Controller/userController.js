import { userModel } from "../Model/userModel.js";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"

const secretKey = process.env.SECRET_KEY;

export const userRegistration = async (req, res) => {
    // console.log(req.body);
    const { userName, firstName, lastName, email, password, mobileNumber } = req.body;

    if (!userName || !email || !firstName || !lastName || !password || !mobileNumber) {
        return res.status(400).json({
            success: false,
            message: "All required!!"
        })
    }

    try {

        const isRegisteredUser = await userModel.findOne({ or$: [{ userName }, { email }, { mobileNumber }] })
        if (isRegisteredUser) {
            return res.status(409).json({
                success: false,
                message: "usr already exits please login!!"
            })
        }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const user = await userModel.create({
            ...req.body,
            password: hashedPassword
        })

        res.status(201).json({
            success: false,
            message: "user registered successfully!!",
            user: user?._id
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }
}



export const userLogin = async (req, res) => {
    console.log(req.body);
    const { userName, email, mobileNumber, password } = req.body;

    if ((!userName && !email && !mobileNumber) || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields is required!!"
        })
    }

    try {

        const user = await userModel.findOne({ $or: [{ email }, { userName }, { mobileNumber }] })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user doesn't exit, please register!!"
            })
        }

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({
                success: false,
                message: "user unAuthorized!!"
            })
        }

        const jwt_payLoad = {
            userId: user._id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
        }

        const token = jwt.sign(jwt_payLoad, secretKey, { expiresIn: "7d" });
        user.token = token;
        await user.save()

        const miliSecondIn7Days = 7 * 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: miliSecondIn7Days
        })

        res.status(200).json({
            success: true,
            message: "user login successfully!!",
            token: `Bearer ${token}`
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }
}

export const userLogOut = async (req, res) => {
    console.log("req.user", req.user);

    try {
        await userModel.findByIdAndUpdate(req.user.userId, { token: null });
        res.clearCookie("token", {
            secure: true,
            sameSite: "none",
            path: "/",
        })


        res.status(200).json({
            success: true,
            message: "user logout successfully!!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }

}