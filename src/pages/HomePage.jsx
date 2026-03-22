import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import logo from "../assets/logo1.png"


export const Home = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔥 PREMIUM CAR IMAGES
  const carImages = [
    "https://images.unsplash.com/photo-1617654112368-307921291f42", // Mercedes
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6", // BMW
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb", // Fortuner
    "https://images.unsplash.com/photo-1625047509168-a7026f36de04", // Mahindra XUV
    "https://images.unsplash.com/photo-1603386329225-868f9b1ee6de"  // Skoda
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // 🔄 AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔍 SEARCH
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/browsecars?search=${search}`);
  };

  return (
    <div className=" mt-20 min-h-screen  bg-gray-100">

      




      {/* 🔥 NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow flex justify-between items-center px-10 py-5">

        <img
  src={logo}
  alt="Car Scout Logo"
  onClick={() => navigate("/")}
  className="h-12 w-auto object-contain hover:scale-105 transition cursor-pointer"
/>

        {/* ✅ BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>

        </div>

      </div>

      
    
  

      {/* HERO SLIDER */}
      <div className="relative h-[70vh]">

        <img
          src={carImages[currentImage]}
          className="w-full h-full object-cover transition duration-1000"
        />

        <div className=" absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Discover Premium Cars
          </h1>
        </div>

      </div>

      {/* 🔍 SEARCH SECTION (CLEAN UI) */}
      <div className="bg-white shadow-lg p-6 mt-6 mx-auto max-w-4xl rounded-xl">

        <div className="flex gap-3 max-w-2xl mx-auto">

          <input
            type="text"
            placeholder="Search the cars here.."
            className="flex-1 p-3 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Search
          </button>

        </div>

      </div>

      {/* FEATURES */}
      <div className="py-16 px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Car Scout?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🔍 Smart Search</h3>
            <p>Find cars easily with advanced filters.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🚗 Test Drive</h3>
            <p>Book test drives instantly.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">💰 Best Deals</h3>
            <p>Negotiate directly with sellers.</p>
          </div>

        </div>

      </div>

    </div>
  );
};