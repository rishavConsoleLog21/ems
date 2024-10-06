import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="not-found-container h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="description" content="Page Not Found" />
      </Helmet>
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't seem to exist.
        <br /> It might have been removed, renamed, or did not exist in the
        first place.
      </p>
      <button
        onClick={handleHomeClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back to Home
      </button>
      <p className="text-gray-500 mt-4">
        If you think this is an error, please{" "}
        <Link to="/footer" className="text-blue-500 hover:underline">
          contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
