import express from "express";
import mongoose from "mongoose";

const app = express();

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
