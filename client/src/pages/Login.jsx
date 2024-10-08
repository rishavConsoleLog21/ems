import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      toast.success("Login successful");
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error("An error occurred while login. Please try again.");
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Helmet>
        <title>Login | Employee Management System</title>
        <meta
          name="description"
          content="Login to Employee Management System"
        />
      </Helmet>
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
          required
          onChange={handleChange}
        />
        <button
          className="bg-green-600 text-white p-2 rounded-lg uppercase hover:opacity-85 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Dont have an account? </p>
        <Link to="/register" className="text-blue-600 font-semibold">
          <span className="text-blue-500 hover:opacity-85">Register</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error
          ? error.message || "An error occurred while login. Please try again."
          : ""}
      </p>
    </div>
  );
};

export default Login;
