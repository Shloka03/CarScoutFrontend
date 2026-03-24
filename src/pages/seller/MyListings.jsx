import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatIndianPrice,formatCompactPrice } from "../../utils/priceFormatter";

export default function MyListings() {

  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      const res = await API.get("/listings/my");
      setListings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // 🔥 DELETE LISTING
  const handleDelete = async (listingId, carId) => {
  try {

    // 🔥 DELETE LISTING
    await API.delete(`/listings/delete/${listingId}`);

    // 🔥 DELETE CAR (IMPORTANT)
    await API.delete(`/cars/delete/${carId}`);

    toast.success("Car deleted completely 🚗");

    fetchListings();

  } catch (err) {
    toast.error("Delete failed");
  }
};

  // 🔥 MARK AS SOLD
  const markAsSold = async (id) => {
    try {
      await API.put(`/listings/update/${id}`, {
        status: "sold"
      });
      toast.success("Marked as sold");
      fetchListings();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')"
      }}
    >

      {/* DARK OVERLAY */}
      <div className="bg-black/60 min-h-screen p-6 rounded-xl">

        <h1 className="text-3xl font-bold mb-8 text-white">
          My Listings 🚗
        </h1>

        {listings.length === 0 ? (
          <p className="text-gray-300">No listings yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {listings.map((item) => {

              const car = item.carId;
              const onRoadPrice = Math.round(car.price * 1.1); // ✅ important

              return (
                <div
                  key={item._id}
                  className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
                >

                  {/* IMAGE */}
                  <img
                    src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                    className="h-40 w-full object-cover rounded-lg cursor-pointer"
                    onClick={() => navigate(`/car/${car._id}`)}
                  />

                  {/* DETAILS */}
                  <h2 className="mt-3 font-semibold text-lg">
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
                                            

                  <p className="text-sm text-gray-500">
                    {car.fuelType} • {car.transmission}
                  </p>

                  {/* STATUS */}
                  <p className={`mt-2 font-medium ${
                    item.status === "sold"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}>
                    Status: {item.status}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="mt-4 flex gap-2">

  {/* EDIT CAR */}
  <button
    onClick={() => navigate(`/seller/editcar/${car._id}`)}
    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
  >
    Edit
  </button>

  {/* MARK SOLD */}
  {item.status !== "sold" && (
    <button
      onClick={() => markAsSold(item._id)}
      className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
    >
      Sold
    </button>
  )}

  {/* DELETE */}
  <button
    onClick={() => handleDelete(item._id, car._id)}
    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
  >
    Delete
  </button>

</div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}