import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { formatIndianPrice, formatCompactPrice } from "../utils/priceFormatter";

export default function CarsDetail() {
   //format price
      //const formatPrice = (price) => {
  //return price?.toLocaleString("en-IN");
//};

  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // FETCH CAR DETAILS
  const fetchCar = async () => {
    try {
      const res = await API.get(`/cars/get/${id}`);
      console.log("Car ID:", id);
      setCar(res.data.data);
    } catch (err) {
      console.log("ERROR:",err.response?.data || err);
      toast.error("Failed to load car details");
    } finally {
      setLoading(false);
    }
  };

  {/*useEffect(() => {
    fetchCar();
  }, []);*/}
  useEffect(() => {
  if (!id) return;
  fetchCar();
}, [id]);
   
   //useEffect(() => {
  //window.scrollTo(0, 0);
//}, []);

  // ✅ AUTO SLIDER
  {/*useEffect(() => {
    if (!car?.media?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === car.media.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [car]);*/}

  // CHECK WISHLIST
  useEffect(() => {
    if (!car) return;

    const existing = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const found = existing.find(item => item._id === car._id);

    setIsWishlisted(!!found);
  }, [car]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === car.media.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? car.media.length - 1 : prev - 1
    );
  };

  const sellerId =
    typeof car.sellerId === "object"
      ? car.sellerId?._id
      : car.sellerId;
      
      //on road price
      const onRoadPrice = Math.round(car.price * 1.1);
      
     


  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        {/* 🔥 MAIN GRID (FIXED LAYOUT) */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 🔥 IMAGE SLIDER */}
          <div>

            <div className="relative">

              <img
                src={
                  car.media?.[currentImage]?.mediaUrl ||
                  "https://via.placeholder.com/500"
                }
                className="w-full h-80 object-cover rounded-lg transition duration-700"
              />

              {/* LEFT */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
              >
                ❮
              </button>

              {/* RIGHT */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
              >
                ❯
              </button>

            </div>

            {/* 🔥 THUMBNAILS */}
            <div className="flex gap-2 mt-3 overflow-x-auto">

              {car.media?.map((img, index) => (
                <img
                  key={index}
                  src={img.mediaUrl}
                  onClick={() => setCurrentImage(index)}
                  className={`h-16 w-24 object-cover rounded cursor-pointer border ${
                    currentImage === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* 🔥 DETAILS */}
          <div>

            {/* TITLE + HEART */}
            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-semibold">
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
                className={`text-xl cursor-pointer ${
                  isWishlisted ? "text-red-500" : "text-gray-400"
                }`}
              />

            </div>
            {/* ON-ROAD PRICE (Lakh/Cr) */}
<p className="text-3xl text-blue-600 font-bold">
  {formatCompactPrice(onRoadPrice)}
</p>
<p className="text-sm text-gray-500">
  On-Road Price (Approx)
</p>

{/* EXTRA UX IMPROVEMENT */}
<p className="text-xs text-green-600 mb-2">
  Includes RTO + Insurance
</p>

{/* EX-SHOWROOM PRICE (NUMBER FORMAT) */}
<p className="text-xl text-gray-700 font-semibold mt-2">
  ₹ {formatIndianPrice(car.price)}
</p>
<p className="text-sm text-gray-700">
  Ex-Showroom Price
</p>

           
            {/*<p className="text-3xl text-blue-600 font-bold mt-2 mb-4">
              ₹ {car.price}
            </p>*/}
             {/* PRICE */}
            {/*<p className="text-3xl text-blue-600 font-bold mt-2">
  ₹ {car.price.toLocaleString("en-IN")}
</p>

<p className="text-sm text-gray-500">
  Ex-Showroom Price
</p>

{/*on road price */}
{/*<p className="text-3xl text-blue-600 font-bold mt-2">
  ₹ {onRoadPrice.toLocaleString("en-IN")}
</p>

<p className="text-sm text-gray-500">
  On-Road Price (Approx)
</p>*/}
            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-3">

              <p>📅 Year: {car.year}</p>
              <p>⛽ Fuel: {car.fuelType}</p>
              <p>⚙️ Transmission: {car.transmission}</p>
              <p>🛣️ Mileage: {car.mileage} kmpl</p>
              <p>🎨 Color: {car.color}</p>

            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-4">

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
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
              >
                Book Test Drive 🚗
              </button>

              <button
                onClick={() => {
                  const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
                  localStorage.setItem("transactions", JSON.stringify([...existing, car]));
                  navigate("/user/transactions");
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg"
              >
                Buy Now 💰
              </button>

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}
        {/*<div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-800">
            {car.description || "No description available"}
          </p>
        </div>*/}
        <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">
    Specifications
  </h2>

  {car.description ? (
    <div className="bg-white rounded-xl p-6 shadow">

      <div className="grid md:grid-cols-2 gap-y-4 gap-x-10">

        {car.description.split("|").map((item, index) => {
          const [key, value] = item.split(":");

          return (
            <div
              key={index}
              className="flex justify-between items-center pb-2 last:border-none border-b "
            >
              {/* LEFT SIDE (LABEL) */}
              <span className="text-gray-500 flex items-center gap-2">
                {key}
              </span>

              {/* RIGHT SIDE (VALUE) */}
              <span className="font-medium text-gray-800">
                {value}
              </span>
            </div>
          );
        })}

      </div>

    </div>
  ) : (
    <p>No description available</p>
  )}
</div>

      </div>

    </div>
  );
}