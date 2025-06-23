import express from "express"
import { signup, signin, signout } from "../controller/authController.js"

const route = express.Router();

route.post('/signup', signup)
route.post('/signin', signin)
route.post('/signout', signout)

export default route;