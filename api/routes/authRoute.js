import express from "express"
import { signup, signin, signout, sendVerificationCode, verifyVerificationCode, changePassword, sendForgotPasswordCode, verifyForgotPasswordCode } from "../controller/authController.js"
import { identifier } from "../middleware/identification.js";

const route = express.Router();

route.post('/signup', signup)
route.post('/signin', signin)
route.post('/signout', identifier, signout)

route.patch('/send-verification-code', identifier, sendVerificationCode)
route.patch('/verify-verification-code', identifier, verifyVerificationCode)
route.patch('/change-password', identifier, changePassword)
route.patch('/send-forgot-password-code', sendForgotPasswordCode)
route.patch('/verify-forgot-password-code', verifyForgotPasswordCode)

export default route;