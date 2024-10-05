import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const EmployeeModal = ({ currentEmployee, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[400px] max-w-full h-[300px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute top-6 right-6 text-3xl text-red-500 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
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
        <img
          src={currentEmployee.image}
          alt="Employee"
          className="w-24 h-24 rounded-full object-cover self-center"
        />
      </div>
    </div>
  );
};

export default EmployeeModal;
