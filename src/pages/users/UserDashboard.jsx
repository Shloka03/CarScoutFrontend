import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { formatIndianPrice,formatCompactPrice } from "../../utils/priceFormatter";

export default function UserDashboard() {

  const [cars, setCars] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const carsRes = await API.get("/cars/get");
      const testDriveRes = await API.get("/testdrive/get");

      setCars(carsRes.data.data);
      setTestDrives(testDriveRes.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

 return (
  <div className="min-h-screen bg-[#0f172a] text-white">

    {/* 🔥 HERO SECTION */}
    <div
      className="h-[300px] bg-cover bg-center relative flex items-center px-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1549921296-3a6b63b1f5c3')"
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👤
        </h1>
        <p className="text-gray-300">
          Explore cars, manage bookings & more
        </p>
      </div>
    </div>

    <div className="p-8 -mt-20">

      {/* 🔥 STATS (GLASS STYLE) */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:scale-105 transition">
          <p className="text-gray-400">Available Cars</p>
          <h2 className="text-3xl font-bold text-blue-400">
            {cars.length}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:scale-105 transition">
          <p className="text-gray-400">Test Drives</p>
          <h2 className="text-3xl font-bold text-green-400">
            {testDrives.length}
          </h2>
        </div>

      </div>

      {/* 🔥 TEST DRIVE SECTION */}
      <h2 className="text-2xl font-semibold mb-5">Your Test Drives 🚗</h2>

      {testDrives.length === 0 ? (
        <p className="text-gray-400 mb-8">No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {testDrives.map((td) => (
            <div
              key={td._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {td.carId?.brand} {td.carId?.model}
              </h3>

              <p className="text-gray-400">
                📅 {new Date(td.testDriveDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </p>

              <p className="text-gray-400">
                ⏰ {td.testDriveTime}
              </p>
            </div>
          ))}

        </div>
      )}

      {/* 🔥 LATEST CARS */}
      <h2 className="text-2xl font-semibold mb-5">Latest Cars 🚗</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {cars.slice(0, 13).map((car) => {

  const onRoadPrice = Math.round(car.price * 1.1); // ✅ important

  return (
    <div
      key={car._id}
      onClick={() => navigate(`/car/${car._id}`)}
      className="group bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition"
    >

      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={
            car.media?.[0]?.mediaUrl ||
            "https://via.placeholder.com/300"
          }
          className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
          alt="car"
        />
      </div>

      {/* DETAILS */}
      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {car.brand} {car.model}
        </h3>

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

    </div>
  );
})}

      </div>

    </div>

  </div>
);
} 