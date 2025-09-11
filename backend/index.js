import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {dbName: "mern-blog"})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
