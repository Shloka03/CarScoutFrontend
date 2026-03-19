import API from "../../api/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

export default function TestDrive() {

  const [date, setDate] = useState("");

  const location = useLocation();
  const { carId, sellerId } = location.state || {};
    if (!carId || !sellerId) {
    return <p>Invalid access. Please select a car first.</p>;
  }

  const bookTestDrive = async () => {
    try {

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      await API.post("/testdrive/add", {
        buyerId: decoded._id,
        carId,
        sellerId,
        testDriveDate: date,
      });

      alert("Test Drive Booked");

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error booking test drive");
    }
  };

  return (
    <div>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={bookTestDrive}>
        Book Test Drive
      </button>

    </div>
  );
}