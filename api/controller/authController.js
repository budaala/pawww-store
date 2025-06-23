import User from "../model/userModel.js";
import signupSchema from "../middleware/validator.js";
import hashing from "../utils/hashing.js";
const { doHash, doHashValidation } = hashing;
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { email, password, name, surname } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password })

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" })
        }

        const hashedPassword = await doHash(password, 12);
        const newUser = new User({
            email, password: hashedPassword, name, surname
        })

        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success: true,
            message: "Account has been created successfully",
            result
        })

    } catch (error) {
        console.log(error)
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password })
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }
        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User does not exist!" })
        }

        const result = await doHashValidation(password, existingUser.password);

        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" })
        }
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, verified: existingUser.verified },
            process.env.TOKEN_SECRET,
            { expiresIn: "8h" })

        res.cookie(
            'Authorization',
            'Bearer ',
            + token,
            {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production'
            }).json({ success: true, token, message: "Logged in successfully" })
    } catch (error) {
        console.log(error)
    }
}

export const signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).json({ success: true, message: "Sign out successfully." })
}