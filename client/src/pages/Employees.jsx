import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import EmployeeTable from "../components/home/EmployeeTable";
import EmployeeCard from "../components/home/EmployeeCard";
import { Helmet } from "react-helmet";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Change items per page as per your requirement
  const [sortOrder, setSortOrder] = useState("asc");
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
        const data = await res.json();
        setEmployees(data.employees);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Sorting
  const sorting = (col) => {
    if (sortOrder === "asc") {
      const sortedEmployees = [...employees].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setEmployees(sortedEmployees);
      setSortOrder("desc");
    }
    if (sortOrder === "desc") {
      const sortedEmployees = [...employees].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setEmployees(sortedEmployees);
      setSortOrder("asc");
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen gap-4">
      <Helmet>
        <title>Employees | Employee Management System</title>
        <meta
          name="description"
          content="Employees of Employee Management System"
        />
      </Helmet>
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-emerald-300 hover:bg-emerald-500 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl py-4 text-blue-600 text-center font-bold uppercase tracking-wider">
          Employee Lists
        </h1>
        <h2 className="text-xl text-blue-600 my-8">
          Total Employees: {filteredEmployees.length}
        </h2>
        <Link to="/employee/create">
          <MdOutlineAddBox className="text-4xl text-emerald-600" />
        </Link>
      </div>
      <div className="flex justify-end items-center gap-x-4 mr-2">
        <input
          type="text"
          placeholder="Search Employee"
          className="p-2 border border-slate-600 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <EmployeeTable currentEmployees={currentEmployees} sorting={sorting} />
      ) : (
        <EmployeeCard currentEmployees={currentEmployees} />
      )}
      {/* Pagination */}
      <ul className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
          (_, i) => (
            <li key={i} className="mx-1">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Employees;
