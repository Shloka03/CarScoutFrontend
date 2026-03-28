import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function PublicNavbar() {

  const navigate = useNavigate();

  return (
    <div className="bg-white shadow flex justify-between items-center px-10 py-4">

      {/* LOGO */}
      <img
        src={logo}
        alt="logo"
        className="h-10 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* NAV LINKS */}
      <div className="flex gap-4">

        <button
          onClick={() => navigate("/browsecars")}
          className="text-gray-700 hover:text-blue-600"
        >
          Browse Cars
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border px-3 py-1 rounded"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Sign Up
        </button>

      </div>

    </div>
  );
}