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
    employeeImage: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/ems-auth-31a53.appspot.com/o/Database_Image%2Fplaceholder.png?alt=media&token=49fc8b31-b961-4465-9609-8eb12951d129",
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
