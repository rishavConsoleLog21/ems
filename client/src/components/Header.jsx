import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-sky-600">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Dashboard</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/employee">
            <li>Employee</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
