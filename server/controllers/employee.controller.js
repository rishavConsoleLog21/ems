import { Employee } from "../models/employee.model.js";
import { errorHandler } from "../utils/error.js";

//NOTE: Routes to Create a new Employee
const newEmployee = async (req, res, next) => {
  const { name, email, phone, designation, gender, course, image } = req.body;

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
      image,
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

//NOTE: Routes to Get all Employees
const allEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});

    if (!employees) {
      return next(errorHandler(404, "No employees found"));
    }

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//NOTE: Routes to get a single Employee
const detailedEmployees = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

//NOTE: Routes to Update an Employee
const updateEmployee = async (req, res, next) => {
  const { name, email, phone, designation, gender, course, image } = req.body;
  try {
    if (!(name && email && phone && designation && gender && course)) {
      return next(errorHandler(400, "All fields are required to update"));
    }
    if (phone.length !== 10) {
      return next(errorHandler(400, "Phone number must be 10 digits"));
    }
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phone,
          designation,
          gender,
          course,
          image,
        },
      },
      { new: true }
    );
    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//NOTE: Routes to Delete an Employee
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  newEmployee,
  allEmployees,
  detailedEmployees,
  updateEmployee,
  deleteEmployee,
};
