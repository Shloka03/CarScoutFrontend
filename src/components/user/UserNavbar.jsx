import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const UserNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-2xl font-bold text-blue-600">
            Car Scout 🚗
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 items-center font-medium">

            <li>
              <Link to="/user/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/user/browse-cars" className="hover:text-blue-500">
                Browse Cars
              </Link>
            </li>

            <li>
              <Link to="/user/saved-cars" className="hover:text-blue-500">
                Saved Cars
              </Link>
            </li>

            <li>
              <Link to="/user/negotiations" className="hover:text-blue-500">
                Negotiations
              </Link>
            </li>

            <li>
              <Link to="/user/test-drives" className="hover:text-blue-500">
                Test Drives
              </Link>
            </li>

            <li>
              <Link to="/user/transactions" className="hover:text-blue-500">
                Transactions
              </Link>
            </li>

             <li>
              <Link to="/user/getapidemo" className="hover:text-blue-500">
                GETAPIDEMO
              </Link>
            </li>

            <li>
              <Link to="/user/profile" className="hover:text-blue-500">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Logout
              </button>
            </li>

          </ul>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <ul className="md:hidden flex flex-col mt-4 gap-3 font-medium">

            <li>
              <Link to="/user/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/user/browse-cars">Browse Cars</Link>
            </li>

            <li>
              <Link to="/user/saved-cars">Saved Cars</Link>
            </li>

            <li>
              <Link to="/user/negotiations">Negotiations</Link>
            </li>

            <li>
              <Link to="/user/test-drives">Test Drives</Link>
            </li>

            <li>
              <Link to="/user/transactions">Transactions</Link>
            </li>

            <li>
              <Link to="/user/profile">Profile</Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg w-fit"
              >
                Logout
              </button>
            </li>

          </ul>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-6 bg-gray-100 min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </>
  );
};