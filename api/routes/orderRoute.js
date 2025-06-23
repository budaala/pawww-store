import express from "express"
import { order, getOrders } from "../controller/orderController.js"

const route = express.Router();

route.post("/orders", order)
route.get("/orders", getOrders)

export default route;