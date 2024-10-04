import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/employee" }) => {
  return (
    <div className="flex justify-start items-center">
      <Link
        to={destination}
        className="bg-sky-600 text-white px-1 py-1 rounded-e-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
