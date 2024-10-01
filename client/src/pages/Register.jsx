import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Registration</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg"
          required
          onChange={handleChange}
        />
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
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded-lg uppercase hover:opacity-85 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Already have an account? </p>
        <Link to="/login" className="text-blue-600 font-semibold">
          <span className="text-blue-500 hover:opacity-85">Login</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error && "An error occurred while registering. Please try again."}
      </p>
    </div>
  );
};

export default Register;
