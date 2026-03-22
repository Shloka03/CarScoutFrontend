import React, { useEffect, useState } from "react";

export default function Transactions() {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions") || "[]");
    setCars(data);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Transactions 💰</h1>

      {cars.length === 0 ? (
        <p>No purchases yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {cars.map((car, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow">

              <img
                src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                className="h-44 w-full object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold mt-3">
                {car.brand} {car.model}
              </h2>

              <p className="text-blue-600 font-bold">
                ₹ {car.price}
              </p>

              <p className="text-green-600 mt-2 font-medium">
                Purchased ✅
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}