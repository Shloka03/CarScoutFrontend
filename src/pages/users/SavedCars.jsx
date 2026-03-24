import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatIndianPrice,formatCompactPrice } from "../../utils/priceFormatter";

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

          {cars.map((car) => {
            const onRoadPrice = Math.round(car.price * 1.1); // ✅ important
            return(

            <div key={car._id} className="bg-white p-4 rounded-xl shadow">

              <img
                onClick={() => navigate(`/car/${car._id}`)}
                src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                className="h-44 w-full object-cover rounded-lg cursor-pointer"
              />

              <h2 className="text-lg font-semibold mt-3">
                {car.brand} {car.model}
              </h2>

              {/* ✅ ON-ROAD PRICE */}
                      <p className="text-blue-400 font-bold">
                        {formatCompactPrice(onRoadPrice)}
                      </p>
              
                      {/* ✅ EXTRA UX */}
                      <p className="text-xs text-green-400">
                        On-road (incl. RTO + Insurance)
                      </p>
              
                      {/* ✅ EX-SHOWROOM */}
                      <p className="text-sm text-gray-400">
                        Ex-showroom: ₹ {formatIndianPrice(car.price)}
                      </p>
                      <p className="text-sm text-gray-400">
          {car.fuelType} • {car.transmission}
        </p>


            </div>
            );
})}

        </div>
      )}

    </div>
  );
}