import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js"
import path from "path"
import { fileURLToPath } from "url"

const app = express();

dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 500;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => console.log(error));

app.use("/api", productRoute);
app.use("/api", orderRoute)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));