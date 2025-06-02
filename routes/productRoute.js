import express from "express"
import { getProducts } from "../controller/productController.js"

const route = express.Router();

route.get("/products", getProducts)

export default route;