import express from "express"
import { getProducts, getProduct } from "../controller/productController.js"

const route = express.Router();

route.get("/products", getProducts)
route.get("/products/:id", getProduct)

export default route;