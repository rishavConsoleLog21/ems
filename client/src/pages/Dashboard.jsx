import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <Helmet>
        <title>Dashboard | Employee Management System</title>
        <meta
          name="description"
          content="Dashboard of Employee Management System"
        />
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Welcome to Employee Management System
        </h1>
        {currentUser ? (
          <div>
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Hello, {currentUser.username} 👋
            </h2>
            <div className="flex justify-evenly">
              <Link
                to="/profile"
                className="inline-block bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
              >
                View Your Profile
              </Link>
              <Link
                to="/employee"
                className="inline-block bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                View Employees
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl text-gray-800 font-semibold mb-4">
              Please login to continue
            </h2>
            <Link
              to="/login"
              className="inline-block bg-green-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
