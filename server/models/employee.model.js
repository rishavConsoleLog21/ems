import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
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
    employeeImage: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/ems-auth-31a53.appspot.com/o/placeholder.png?alt=media&token=289ab040-af2d-4647-8bf9-89c0893347a9",
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
