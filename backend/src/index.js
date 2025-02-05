import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

// extract the json data out of the body
app.use(express.json());
// Parse the cookies - grab the cookie value
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// connect to the server and db
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
