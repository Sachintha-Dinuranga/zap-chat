import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

// extract the json data out of the body
app.use(express.json());
// Parse the cookies - grab the cookie value
app.use(cookieParser());
// Setting up cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// connect to the server and db
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
