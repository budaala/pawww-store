import User from "../model/userModel.js";
import validator from "../middleware/validator.js";
const { signupSchema, acceptCodeSchema, changePasswordSchema, acceptForgotPasswordCodeSchema } = validator;
import hashing from "../utils/hashing.js";
const { doHash, doHashValidation, hmacProcess } = hashing;
import jwt from "jsonwebtoken"
import transport from "../middleware/sendMail.js";

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

export const sendVerificationCode = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist!" })
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "User already verified!" })
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "Verification code",
            html: '<h1>' + codeValue + '</h1>'
        })

        if (info.accepted[0] === existingUser.email) {
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValidation = Date.now();
            await existingUser.save();
            return res.status(200).json({ success: true, message: 'Code sent.' })
        }
        res.status(400).json({ success: false, message: "Code sent failed." })
    } catch (error) {
        console.log(error);
    }
}

export const verifyVerificationCode = async (req, res) => {
    const { email, providedCode } = req.body;
    try {
        const { error, value } = acceptCodeSchema.validate({ email, providedCode })
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }

        const codeValue = providedCode.toString();
        const existingUser = await User.findOne({ email }).select('+verificationCode +verificationCodeValidation');

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist!" })
        }

        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "User already verified!" })
        }

        if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
            return res.status(400).json({ success: false, message: "There are some troubles with the verification code." })
        }

        if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
            return res.status(400).json({ success: false, message: "Code has expired!" })
        }

        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)

        if (hashedCodeValue === existingUser.verificationCode) {
            existingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodeValidation = undefined;
            await existingUser.save();
            return res.status(200).json({ success: true, message: 'The account has been verified.' })
        }
        return res.status(400).json({ success: false, message: "Unexpected error occured" })
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (req, res) => {
    const { userId, verified } = req.user;
    const { oldPassword, newPassword } = req.body;

    try {
        const { error, value } = changePasswordSchema.validate({ oldPassword, newPassword })
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }

        if (!verified) {
            return res.status(400).json({ success: false, message: "User not verified!" })
        }

        const existingUser = await User.findOne({ _id: userId }).select('+password');

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist!" })
        }

        const validationResult = await doHashValidation(oldPassword, existingUser.password);

        if (!validationResult) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" })
        }

        const hashedPassword = await doHash(newPassword, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.status(200).json({ success: true, message: 'The password has been changed' })

    } catch (error) {
        console.log(error)
    }
}

export const sendForgotPasswordCode = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist!" })
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "Forgot password code",
            html: '<h1>' + codeValue + '</h1>'
        })

        if (info.accepted[0] === existingUser.email) {
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
            existingUser.forgotPasswordCode = hashedCodeValue;
            existingUser.forgotPasswordCodeValidation = Date.now();
            await existingUser.save();
            return res.status(200).json({ success: true, message: 'Code sent.' })
        }
        res.status(400).json({ success: false, message: "Code sent failed." })
    } catch (error) {
        console.log(error);
    }
}

export const verifyForgotPasswordCode = async (req, res) => {
    const { email, providedCode, newPassword } = req.body;
    try {
        const { error, value } = acceptForgotPasswordCodeSchema.validate({ email, providedCode })
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }

        const codeValue = providedCode.toString();
        const existingUser = await User.findOne({ email }).select('+forgotPasswordCode +forgotPasswordCodeValidation');

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist!" })
        }

        if (!existingUser.forgotPasswordCode || !existingUser.forgotPasswordCodeValidation) {
            return res.status(400).json({ success: false, message: "There are some troubles with the verification code." })
        }

        if (Date.now() - existingUser.forgotPasswordCodeValidation > 5 * 60 * 1000) {
            return res.status(400).json({ success: false, message: "Code has expired!" })
        }

        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)

        if (hashedCodeValue === existingUser.forgotPasswordCode) {
            existingUser.password = await doHash(newPassword, 12);
            existingUser.forgotPasswordCode = undefined;
            existingUser.forgotPasswordCodeValidation = undefined;
            await existingUser.save();
            return res.status(200).json({ success: true, message: 'The password has been changed.' })
        }
        return res.status(400).json({ success: false, message: "Unexpected error occured" })
    } catch (error) {
        console.log(error);
    }
}