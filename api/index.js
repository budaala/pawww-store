import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js"
import authRoute from "./routes/authRoute.js"
import path from "path"
import { fileURLToPath } from "url"

const app = express();

dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/auth", authRoute)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));