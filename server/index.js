import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
  });
});
