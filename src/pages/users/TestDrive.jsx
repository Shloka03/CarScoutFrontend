import API from "../../api/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TestDrive() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // ✅ NEW
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // ✅ GET FROM URL
  const carId = params.get("carId");
  const sellerId = params.get("sellerId");

  console.log("carId:", carId);
  console.log("sellerId:", sellerId);

  if (!carId || !sellerId) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-red-500">
          Invalid access. Please select a car first.
        </h2>

        <button
          onClick={() => navigate("/browsecars")}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Go to Browse Cars
        </button>
      </div>
    );
  }

  // ✅ BOOK TEST DRIVE
  const bookTestDrive = async () => {
    try {

      if (!date || !time) {
        toast.error("Please select date and time");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const decoded = jwtDecode(token);

      await API.post("/testdrive/add", {
        carId,
        sellerId,
        testDriveDate: date,
        testDriveTime: time // ✅ NEW FIELD
      });

      toast.success("Test Drive Booked Successfully 🚗");

      navigate("/browsecars");

    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Error booking test drive");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')"
      }}
    >

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Book Test Drive 🚗
        </h2>

        {/* DATE */}
        <input
          type="date"
          className="w-full border p-2 rounded-lg mb-4"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* TIME ✅ */}
        <input
          type="time"
          className="w-full border p-2 rounded-lg mb-4"
          onChange={(e) => setTime(e.target.value)}
        />

        <button
          onClick={bookTestDrive}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Confirm Booking
        </button>

      </div>

    </div>
  );
}