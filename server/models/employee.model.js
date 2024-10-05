import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: [true, "Phone already exists"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
