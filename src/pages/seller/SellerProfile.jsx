import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function SellerProfile() {

  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1493238792000-8113da705763')"
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* PROFILE CARD */}
      <div className="relative bg-white/10 backdrop-blur-xl text-white p-10 rounded-2xl shadow-2xl w-[420px] text-center border border-white/20">

        {/* PROFILE IMAGE */}
        <img
          src={
            user?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/30 object-cover"
        />

        <h2 className="text-2xl font-bold mb-2">
          {user?.fullName}
        </h2>

        <p className="text-gray-300 mb-6">
          {user?.email}
        </p>

        {/* 🔥 BASIC DETAILS */}
        <div className="text-left space-y-3">

          <div className="flex justify-between border-b border-white/20 pb-2">
            <span>Role</span>
            <span className="font-semibold">{user?.role}</span>
          </div>

          <div className="flex justify-between border-b border-white/20 pb-2">
            <span>Status</span>
            <span className="font-semibold">{user?.accountStatus}</span>
          </div>

        </div>

        {/* 🔥 SELLER DETAILS */}
        {user?.extra && (
          <div className="text-left space-y-3 mt-6">

            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Seller Details
            </h3>

            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Company</span>
              <span className="font-semibold">
                {user.extra.companyName || "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Seller Type</span>
              <span className="font-semibold">
                {user.extra.sellerType}
              </span>
            </div>

            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Rating</span>
              <span className="font-semibold">
                ⭐ {user.extra.rating || 0}
              </span>
            </div>

            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Verified</span>
              <span className={`font-semibold ${
                user.extra.verificationStatus
                  ? "text-green-400"
                  : "text-red-400"
              }`}>
                {user.extra.verificationStatus ? "Yes ✅" : "No ❌"}
              </span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}