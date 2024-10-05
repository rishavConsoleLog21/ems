import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout");
      dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-sky-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1
            className="font-bold text-2xl text-slate-700 cursor-pointer hover:text-slate-500 transition-colors duration-300 ease-in-out hover:scale-110 transform
          "
          >
            Dashboard
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/employee">
            {currentUser ? (
              <li
                className="
          text-slate-700 hover:text-slate-500 transition-colors duration-300 ease-in-out hover:scale-110 transform cursor-pointer
          "
              >
                Employee
              </li>
            ) : null}
          </Link>
          <Link to="/register">
            {currentUser ? (
              <li
                onClick={handleLogout}
                className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 ease-in-out hover:scale-110 transform"
              >
                Logout
              </li>
            ) : (
              <li>Register</li>
            )}
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profileImage}
                alt="profile image"
                className="h-7 w-7 rounded-full object-cover hover:scale-110 transition-transform cursor-pointer mx-2 border-2 border-slate-700 hover:border-slate-500"
              />
            ) : (
              <li>Login</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
