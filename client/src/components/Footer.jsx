import { Link } from "react-router-dom";
import { socialLinks } from "../constant/index";

const Footer = () => {
  return (
    <footer className="mt-auto py-4 w-full">
      <hr className="border-slate-200" />

      <div className="container mx-auto text-center p-4 flex flex-row justify-evenly">
        <p className="text-gray-700 mb-2">
          Developed by{" "}
          <strong className="text-pink-500">
            <Link target="_blank" to="https://rishavconsolelog.works/">
              Rishav Kumar
            </Link>
          </strong>
          .
        </p>
        <p className="text-gray-700 mb-4">
          All rights reserved. © 2024{" "}
          <strong className="text-pink-500">Rishav Kumar</strong>.
        </p>

        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
