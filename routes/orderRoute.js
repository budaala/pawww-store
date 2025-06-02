import express from "express"
import { order } from "../controller/orderController.js"

const route = express.Router();

route.post("/orders", order)

export default route;