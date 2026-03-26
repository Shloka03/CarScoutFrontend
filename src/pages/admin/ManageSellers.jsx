import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function ManageSellers() {

  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const res = await API.get("/seller/get");
      setSellers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // 🔥 VERIFY / UNVERIFY
  const handleVerify = async (id) => {
    try {
      await API.put(`/seller/verify/${id}`);
      toast.success("Verification Updated ✅");
      fetchSellers();
    } catch (err) {
      toast.error("Error updating");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Manage Sellers 🏢
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {sellers.map((seller) => (
          <div
            key={seller._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            {/* USER INFO */}
            <h2 className="text-lg font-semibold">
              {seller.userId?.fullName}
            </h2>

            <p className="text-gray-600">
              {seller.userId?.email}
            </p>

            {/* COMPANY */}
            <p className="mt-2">
              🏢 Company: {seller.companyName || "N/A"}
            </p>

            <p>
              📌 Type: {seller.sellerType}
            </p>

            <p>
              ⭐ Rating: {seller.rating}
            </p>

            {/* STATUS */}
            <p className="mt-2">
              Status:
              {seller.verificationStatus ? (
                <span className="ml-2 text-green-600 font-medium">
                  Verified
                </span>
              ) : (
                <span className="ml-2 text-red-500 font-medium">
                  Not Verified
                </span>
              )}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => handleVerify(seller._id)}
              className={`mt-4 w-full py-2 rounded text-white ${
                seller.verificationStatus
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {seller.verificationStatus
                ? "Unverify ❌"
                : "Verify ✅"}
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}