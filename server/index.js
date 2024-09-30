import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

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
