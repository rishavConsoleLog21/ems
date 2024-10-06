import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Snipper from "../components/Spinner";
import { Helmet } from "react-helmet";

const DetailedEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEmployee();
    /*
    //NOTE:2nd Way with try and catch block
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/employees/${id}`);
        setEmployee(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchEmployee();
    //NOTE: 3rd Way with Promise using Then and Catch block
    axios
       .get(`/api/v1/employees/${id}`)
       .then((res) => {
         setEmployee(res.data);
         setLoading(false);
       })
       .catch((err) => {
         console.error(err);
         setLoading(false);
       });
    */
  }, []);

  return (
    <div className="p-4 text-center min-h-screen flex flex-col justify-center items-center">
      <Helmet>
        <title>{`${employee.name}`}'s Details</title>
        <meta
          name="description"
          content="Details of employee from Employee Management System"
        />
      </Helmet>
        <BackButton/>
      <div className="w-full">
        <h1 className="text-2xl text-center">{employee.name} Details</h1>
      </div>
      {loading ? (
        <Snipper />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 items-start">
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Unique ID
            </span>
            <span>{employee._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Name
            </span>
            <span>{employee.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Email
            </span>
            <span>{employee.email}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Phone
            </span>
            <span>{employee.phone}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Designation
            </span>
            <span>{employee.designation}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Gender
            </span>
            <span className="uppercase">{employee.gender}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Course
            </span>
            <span className="uppercase">{employee.course}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Created At
            </span>
            <span>
              {new Date(employee.createdAt).toString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-slate-600 font-semibold">
              Last Updated
            </span>
            <span>
              {new Date(employee.updatedAt).toString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedEmployee;
