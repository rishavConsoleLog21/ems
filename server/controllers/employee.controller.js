import { Employee } from "../models/employee.model.js";
import { errorHandler } from "../utils/error.js";

//NOTE: Routes to Create a new Employee
const newEmployee = async (req, res, next) => {
  const { name, email, phone, designation, gender, course } = req.body;

  try {
    if (
      [name, email, phone, designation, gender, course].some(
        (field) => field?.trim() === ""
      )
    ) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (phone.length !== 10) {
      return next(errorHandler(400, "Phone number must be 10 digits"));
    }

    // Check if employee with the same email or phone number already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingEmployee) {
      return next(
        errorHandler(
          400,
          "Employee with same email or phone number already exists"
        )
      );
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      designation,
      gender,
      course,
    });

    const createdEmployee = await Employee.findById(employee._id);

    if (!createdEmployee) {
      return next(errorHandler(500, "Failed to create employee"));
    }

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: createdEmployee,
    });
  } catch (error) {
    next(error);
  }
};

export { newEmployee };
