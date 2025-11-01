import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import morgan from "morgan"
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();


connectDB();

//Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(morgan("dev"));







app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send("Hello from nodejs backend!")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

