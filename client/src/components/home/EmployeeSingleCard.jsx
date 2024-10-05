import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import EmployeeModal from "./EmployeeModal";

const EmployeeSingleCard = ({ currentEmployee }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      key={currentEmployee._id}
      className="bg-slate-200 p-4 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {currentEmployee.designation}
      </h2>
      <h4 className="my-2 text-slate-500">{currentEmployee.name}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-2xl text-sky-500" />
        <h2 className="text-slate-500">{currentEmployee.course}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-2xl text-sky-500" />
        <h2 className="my-1">{currentEmployee.phone}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-emerald-400 mx-2 hover:text-emerald-700 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/employee/details/${currentEmployee._id}`}>
          <BsInfoCircle className="text-2xl text-blue-400 mx-2 hover:text-blue-700" />
        </Link>
        <Link to={`/employee/update/${currentEmployee._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-300 mx-2 hover:text-yellow-500" />
        </Link>
        <Link to={`/employee/delete/${currentEmployee._id}`}>
          <MdOutlineDelete className="text-2xl text-red-500 mx-2 hover:text-red-700" />
        </Link>
      </div>
      {showModal && (
        <EmployeeModal
          currentEmployee={currentEmployee}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeSingleCard;
