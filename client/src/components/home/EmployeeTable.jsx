import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

const EmployeeTable = ({ currentEmployees, sorting }) => {
  return (
    <table className="w-full border-separate border-spacing-1">
      <thead>
        <tr className="bg-slate-300">
          <th
            onClick={() => sorting("_id")}
            className="border border-slate-600 rounded-md hover:cursor-pointer max-md:hidden"
          >
            Unique ID
          </th>
          <th className="border border-slate-600 rounded-md">Image</th>
          <th
            onClick={() => sorting("name")}
            className="border border-slate-600 rounded-md hover:cursor-pointer"
          >
            Name
          </th>
          <th
            onClick={() => sorting("email")}
            className="border border-slate-600 rounded-md hover:cursor-pointer"
          >
            Email Id
          </th>
          <th className="border border-slate-600 rounded-md">Mobile No</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Designation
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Gender
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Course
          </th>
          <th
            onClick={() => sorting("createdAt")}
            className="border border-slate-600 rounded-md max-md:hidden hover:cursor-pointer"
          >
            Created At
          </th>
          <th className="border border-slate-600 rounded-md">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentEmployees.map((employee, index) => (
          <tr key={employee._id} className="text-center">
            <td className="border border-slate-700 rounded-md max-md:hidden py-2">
              {employee._id}
            </td>
            <td className="border border-slate-700 rounded-md py-0">
              <img
                src={employee.image}
                className="h-10 w-10 rounded-full object-cover mx-auto"
              />
            </td>
            <td className="border border-slate-700 rounded-md py-2">
              {employee.name}
            </td>
            <td className="border border-slate-700 rounded-md">
              {employee.email}
            </td>
            <td className="border border-slate-700 rounded-md py-2">
              {employee.phone}
            </td>
            <td className="border border-slate-700 rounded-md max-md:hidden py-2">
              {employee.designation}
            </td>
            <td className="border border-slate-700 rounded-md max-md:hidden py-2">
              {employee.gender}
            </td>
            <td className="border border-slate-700 rounded-md max-md:hidden py-2">
              {employee.course}
            </td>
            <td className="border border-slate-700 rounded-md max-md:hidden py-2">
              {new Date(employee.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td className="border border-slate-700 rounded-md py-2">
              <div className="flex justify-center gap-x-4">
                <Link to={`/employee/details/${employee._id}`}>
                  <BsInfoCircle className="text-2xl text-blue-600 mx-2" />
                </Link>
                <Link to={`/employee/update/${employee._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-300 mx-2" />
                </Link>
                <Link to={`/employee/delete/${employee._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600 mx-2" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
