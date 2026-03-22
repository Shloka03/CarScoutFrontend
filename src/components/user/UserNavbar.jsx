import React, { useState } from "react";
import logo from "../../assets/logo1.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";


export const UserNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDropdown, setOpenDropdown] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
        <div className="flex justify-between items-center">

          <img
  src={logo}
  alt="Car Scout"
  className="h-14 cursor-pointer hover:scale-105 transition"
/>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 items-center font-medium">

            <li>
              <Link to="/user/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/browsecars" className="hover:text-blue-500">
                Browse Cars
              </Link>
            </li>

            <li>
              <Link to="/user/savedcars" className="hover:text-blue-500">
                Saved Cars
              </Link>
            </li>

            <li>
              <Link to="/user/negotiations" className="hover:text-blue-500">
                Negotiations
              </Link>
            </li>

            <li>
              <Link to="/user/testdrive" className="hover:text-blue-500">
                Test Drives
              </Link>
            </li>

            <li>
              <Link to="/user/transactions" className="hover:text-blue-500">
                Transactions
              </Link>
            </li>

             <li className="relative">

  {/* BUTTON */}
  <div
    onClick={() => setOpenDropdown(!openDropdown)}
    className="flex items-center gap-2 cursor-pointer"
  >
    {/* AVATAR */}
    <img
  src={
    user?.profileImage
      ? user.profileImage
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  alt="avatar"
  className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:scale-105 transition"
/>

   

    <FaChevronDown className="text-sm" />
  </div>

  {/* DROPDOWN MENU */}
  {openDropdown && (
    <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg z-50">

      {/* USER INFO */}
      <div className="px-4 py-3 border-b">
        <p className="font-semibold">{user?.fullName}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* PROFILE */}
      <Link
        to="/user/profile"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Profile
      </Link>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
      >
        Logout
      </button>

    </div>
  )}

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
              <Link to="/user/browsecars">Browse Cars</Link>
            </li>

            <li>
              <Link to="/user/savedcars">Saved Cars</Link>
            </li>

            <li>
              <Link to="/user/negotiations">Negotiations</Link>
            </li>

            <li>
              <Link to="/user/testdrive">Test Drives</Link>
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