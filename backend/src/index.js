import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// extract the json data out of the body
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// connect to the server and db
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
