import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { formatIndianPrice, formatCompactPrice } from "../utils/priceFormatter";

export default function BrowseCars() {
   const [params] = useSearchParams();

  const navigate = useNavigate();
 

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    transmission: "",
    minPrice: "",
    maxPrice: ""
  });

  // SEARCH STATE
  const [search, setSearch] = useState(params.get("search" || ""));

  // ACCORDION STATE
  const [openSection, setOpenSection] = useState({
    budget: true,
    brand: true,
    fuel: true,
    transmission: true
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // FETCH CARS
  const fetchCars = async () => {
    try {
      const query = new URLSearchParams({
        ...filters,
        search
      }).toString();

      const res = await API.get(`/cars/get?${query}`);
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
  }, [search]);
  
  useEffect(() => {
  const urlSearch = params.get("search") || "";
  setSearch(urlSearch);
}, [params]);

  if (loading) return <p className="text-center mt-10">Loading cars...</p>;
  
  //const onRoadPrice = Math.round(cars.price * 1.1);

  return (
    <div className="flex gap-6 bg-gray-100 min-h-screen p-6">

      {/* FILTER SIDEBAR */}
      <div className="w-72 bg-white p-5 rounded-2xl shadow-lg border h-fit sticky top-5">

        <h2 className="text-xl font-semibold mb-5">Filters</h2>

        {/* BUDGET */}
        <div className="border-b py-3">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleSection("budget")}
          >
            Budget
            <span>{openSection.budget ? "▲" : "▼"}</span>
          </div>

          {openSection.budget && (
            <div className="mt-3 space-y-2">
              <input
                type="number"
                placeholder="Min Price"
                className="w-full border p-2 rounded-lg"
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-full border p-2 rounded-lg"
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {/* BRAND */}
        <div className="border-b py-3">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleSection("brand")}
          >
            Brand
            <span>{openSection.brand ? "▲" : "▼"}</span>
          </div>

          {openSection.brand && (
            <select
              className="w-full mt-3 border p-2 rounded-lg"
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="hyundai">Hyundai</option>
              <option value="tata">Tata</option>
              <option value="mahindra">Mahindra</option>
              <option value="mercedes">Mercedes</option>
              <option value="marutisuzuki">MarutiSuzuki</option>
            </select>
          )}
        </div>

        {/* FUEL */}
        <div className="border-b py-3">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleSection("fuel")}
          >
            Fuel Type
            <span>{openSection.fuel ? "▲" : "▼"}</span>
          </div>

          {openSection.fuel && (
            <select
              className="w-full mt-3 border p-2 rounded-lg"
              onChange={(e) =>
                setFilters({ ...filters, fuelType: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          )}
        </div>

        {/* TRANSMISSION */}
        <div className="border-b py-3">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleSection("transmission")}
          >
            Transmission
            <span>{openSection.transmission ? "▲" : "▼"}</span>
          </div>

          {openSection.transmission && (
            <select
              className="w-full mt-3 border p-2 rounded-lg"
              onChange={(e) =>
                setFilters({ ...filters, transmission: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          )}
        </div>

        <button
          onClick={fetchCars}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Apply Filters
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* SEARCH */}
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Search the cars.."
            className="flex-1 p-3 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={fetchCars}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Search
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Browse Cars 🚗</h1>

        {cars.length === 0 ? (
          <p>No cars found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {cars.map((car) => {
              const onRoadPrice = Math.round(car.price * 1.1);

              const sellerId =
                typeof car.sellerId === "object"
                  ? car.sellerId?._id
                  : car.sellerId;

              return (
                <div key={car._id} className="bg-white p-4 rounded-xl shadow">

                  <img
                    onClick={()=>navigate(`/car/${car._id}`)}
                    src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                    className="h-44 w-full object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                    alt="car"
                  />

                  <h2
  onClick={() => navigate(`/car/${car._id}`)}
  className="text-lg font-semibold mt-3 cursor-pointer hover:text-blue-600"
>
  {car.brand} {car.model}
</h2>

                  {/*<p className="text-blue-600 font-bold text-lg">
                    ₹ {car.price.toLocaleString("en-IN")}
                  </p>*/}

                  <p className="text-blue-600 font-bold text-lg">
  {formatCompactPrice(onRoadPrice)}
</p>

<p className="text-xs text-green-600">
  On-road (incl. RTO + Insurance)
</p>

<p className="text-sm text-gray-500">
  Ex-showroom: ₹ {formatIndianPrice(car.price)}
</p>

                  <p className="text-sm text-gray-500">
                    {car.fuelType} • {car.transmission}
                  </p>

                  <button
                    onClick={() => {
                      const sellerId = car.sellerId;
                      console.log("CAR:",car)
                      console.log("sellerId:",car.sellerId)

                      {/*const sellerId =
      typeof car.sellerId === "object"
        ? car.sellerId?._id
        : car.sellerId;

    console.log("carId:", car._id);
    console.log("sellerId:", sellerId);
    console.log("FULL CAR:", car);*/}

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
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Book Test Drive
                  </button>
                  {/*<button
  onClick={() => {
    const existing = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const alreadyExists = existing.find(item => item._id === car._id);

    if (alreadyExists) {
      toast.info("Already in wishlist");
      return;
    }

    localStorage.setItem("wishlist", JSON.stringify([...existing, car]));
    toast.success("Added to wishlist ❤️");
  }}
  className="mt-2 w-full bg-gray-200 py-2 rounded-lg"
>
  ❤️ Wishlist
</button>*/}

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}