import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedCars() {

  const [cars, setCars] = useState([]);
  const navigate = useNavigate();


  
  useEffect(() => {
  const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
  setCars(data);
}, []);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Saved Cars ❤️</h1>

      {cars.length === 0 ? (
        <p>No saved cars</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {cars.map((car) => (
            <div key={car._id} className="bg-white p-4 rounded-xl shadow">

              <img
                onClick={() => navigate(`/car/${car._id}`)}
                src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                className="h-44 w-full object-cover rounded-lg cursor-pointer"
              />

              <h2 className="text-lg font-semibold mt-3">
                {car.brand} {car.model}
              </h2>

              <p className="text-blue-600 font-bold">
                ₹ {car.price}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}