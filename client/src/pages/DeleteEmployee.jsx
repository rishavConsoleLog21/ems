import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const DeleteEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/employees/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
        const data = await res.json();
        setEmployee(data);
        setLoading(false);
        if (data.success === false) {
          toast.error(data.message);
          navigate("/employee");
          return;
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handelDeleteEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/employees/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      toast.success(data.message);
      setLoading(false);
      navigate("/employee");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Deleting {`${employee.name}`}</title>
        <meta name="description" content="Deleting Employee" />
      </Helmet>
      <BackButton />
      <h1 className="text-3xl my-4 font-semibold text-center">
        Deleting Employee {employee.name}
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl ">
          Sure Want to Delete
          <span className="text-red-500"> {employee.name} </span>
          from
          <span className="font-semibold"> {employee.designation} ?</span>
        </h2>
        <button
          className="p-4 bg-red-600 text-white m-4 w-fit hover:bg-red-700 rounded-xl transition duration-500"
          onClick={handelDeleteEmployee}
        >
          Yes, Delete {employee.name}
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
