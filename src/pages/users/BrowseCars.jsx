import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ FIX

export default function BrowseCars() {

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars/get");
      setCars(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 🔄 LOADING STATE
  if (loading) {
    return <p className="text-center mt-10">Loading cars...</p>;
  }

  // 🚫 EMPTY STATE
  if (cars.length === 0) {
    return <p className="text-center mt-10">No cars available</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Cars 🚗</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cars.map((car) => {

          const sellerId = car.sellerId?._id; // ✅ FIX

          return (
            <div key={car._id} className="bg-white p-4 rounded shadow">

              {/* IMAGE */}
              <img
                src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                className="h-40 w-full object-cover rounded"
                alt="car"
              />

              {/* TITLE */}
              <h2 className="text-xl font-semibold mt-2">
                {car.brand} {car.model}
              </h2>

              {/* PRICE */}
              <p className="text-gray-600">
                ₹ {car.price}
              </p>

              {/* DETAILS */}
              <p className="text-sm text-gray-500">
                {car.fuelType} | {car.transmission}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => {
                  if (!car._id || !sellerId) {
                    toast.error("Invalid car data");
                    return;
                  }

                  navigate("/user/testdrive", {
                    state: {
                      carId: car._id,
                      sellerId: sellerId
                    }
                  });
                }}
                className="bg-blue-500 text-white px-3 py-1 mt-3 rounded hover:bg-blue-600"
              >
                Book Test Drive
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
}