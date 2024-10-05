import EmployeeSingleCard from "./EmployeeSingleCard";

const EmployeeCard = ({ currentEmployees }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {currentEmployees.map((item) => (
        <EmployeeSingleCard key={item._id} currentEmployee={item} />
      ))}
    </div>
  );
};

export default EmployeeCard;
