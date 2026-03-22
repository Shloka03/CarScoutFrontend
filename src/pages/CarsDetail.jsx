import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

export default function CarsDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // FETCH CAR DETAILS
  const fetchCar = async () => {
    try {
      const res = await API.get(`/cars/get/${id}`);
      setCar(res.data.data);
    } catch (err) {
      toast.error("Failed to load car details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // CHECK WISHLIST STATUS
  useEffect(() => {
    if (!car) return;

    const existing = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const found = existing.find(item => item._id === car._id);

    setIsWishlisted(!!found);
  }, [car]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;

  const sellerId =
    typeof car.sellerId === "object"
      ? car.sellerId?._id
      : car.sellerId;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        {/* 🔥 IMAGE SECTION */}
        <div className="grid md:grid-cols-2 gap-6">

          <img
            src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/500"}
            className="w-full h-80 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
          />

          {/* DETAILS */}
          <div>

            {/* 🔥 TITLE + HEART */}
            <div className="flex justify-between items-center mt-2">

              <h2 className="text-xl font-semibold">
                {car.brand} {car.model}
              </h2>

              <FaHeart
                onClick={() => {
                  let existing = JSON.parse(localStorage.getItem("wishlist") || "[]");

                  if (isWishlisted) {
                    existing = existing.filter(item => item._id !== car._id);
                    localStorage.setItem("wishlist", JSON.stringify(existing));
                    setIsWishlisted(false);
                  } else {
                    localStorage.setItem("wishlist", JSON.stringify([...existing, car]));
                    setIsWishlisted(true);
                  }
                }}
                className={`text-xl cursor-pointer transition hover:scale-110 ${
                  isWishlisted ? "text-red-500" : "text-gray-400"
                }`}
              />

            </div>

            {/* PRICE */}
            <p className="text-3xl text-blue-600 font-bold mt-2 mb-4">
              ₹ {car.price}
            </p>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-3 text-black-600">

              <p>📅 Year: {car.year}</p>
              <p>⛽ Fuel: {car.fuelType}</p>
              <p>⚙️ Transmission: {car.transmission}</p>
              <p>🛣️ KM Driven: {car.distanceDriven}</p>
              <p>🎨 Color: {car.color}</p>

            </div>

            {/* 🔥 BUTTONS */}
            <div className="mt-6 flex gap-4">

              {/* TEST DRIVE */}
              <button
                onClick={() => {

                  if (!sellerId) {
                    toast.error("Seller ID missing");
                    return;
                  }

                  const token = localStorage.getItem("token");

                  if (!token) {
                    toast.error("Please login first");
                    navigate("/login");
                    return;
                  }

                  navigate(`/user/testdrive?carId=${car._id}&sellerId=${sellerId}`);

                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Book Test Drive 🚗
              </button>

              {/* BUY NOW */}
              <button
                onClick={() => {
                  const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
                  localStorage.setItem("transactions", JSON.stringify([...existing, car]));
                  navigate("/user/transactions");
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Buy Now 💰
              </button>

            </div>

          </div>

        </div>

        {/* 🔥 DESCRIPTION */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">
            {car.description || "No description available"}
          </p>
        </div>

      </div>

    </div>
  );
}