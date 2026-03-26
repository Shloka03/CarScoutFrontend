import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function SellerTestDrives() {

  const [testDrives, setTestDrives] = useState([]);

  const fetchTestDrives = async () => {
    try {
      const res = await API.get("/testdrive/seller");
      setTestDrives(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestDrives();
  }, []);

  // 🔥 APPROVE FUNCTION
  const handleApprove = async (id) => {
    try {
      await API.put(`/testdrive/approve/${id}`);
      toast.success("Test Drive Approved ✅");
      fetchTestDrives();
    } catch (err) {
      toast.error("Error approving");
    }
  };
  {/*const handleReject = async (id) => {
  try {
    await API.put(`/testdrive/reject/${id}`);
    toast.success("Test Drive Rejected ❌");
    fetchTestDrives();
  } catch (err) {
    toast.error("Error rejecting");
  }
};*/}
const handleReject = async (id) => {
  try {
    await API.put(`/testdrive/reject/${id}`);
    toast.success("Test Drive Rejected ❌");
    fetchTestDrives();
  } catch (err) {
    console.log(err.response?.data); // 🔥 ADD THIS
    toast.error(err.response?.data?.message || "Error rejecting");
  }
};
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Test Drive Requests 🚗
      </h1>

      {testDrives.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {testDrives.map((td) => (
            <div
              key={td._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >

              <h2 className="text-lg font-semibold mb-2">
                {td.carId?.brand} {td.carId?.model}
              </h2>

              <p>👤 Buyer: {td.buyerId?.fullName}</p>
              <p>📧 Email: {td.buyerId?.email}</p>
              <p>📅 Date: {new Date(td.testDriveDate).toLocaleDateString()}</p>
              <p>⏰ Time: {td.testDriveTime}</p>

              <p className={`mt-2 font-semibold ${
                td.status === "approved" ? "text-green-600" : "text-yellow-500"
              }`}>
                Status: {td.status}
              </p>

              {/* APPROVE BUTTON */}
              {td.status === "requested" && (
  <div className="flex gap-3 mt-4">

    {/* APPROVE */}
    <button
      onClick={() => handleApprove(td._id)}
      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
    >
      Approve ✅
    </button>

    {/* REJECT */}
    <button
      onClick={() => handleReject(td._id)}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
    >
      Reject ❌
    </button>

  </div>
)}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}