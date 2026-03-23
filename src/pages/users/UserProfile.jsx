import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserProfile() {

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
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')"
      }}
    >

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 PROFILE CARD */}
      <div className="relative bg-white/10 backdrop-blur-xl text-white p-8 rounded-2xl shadow-2xl w-96 text-center border border-white/20">

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
          {user?.fullName || "User"}
        </h2>

        <p className="text-gray-300 mb-4">
          {user?.email}
        </p>

        {/* DETAILS */}
        <div className="text-left space-y-3 mt-6">

          <div className="flex justify-between border-b border-white/20 pb-2">
            <span className="text-gray-300">Role</span>
            <span className="font-semibold">{user?.role}</span>
          </div>

          <div className="flex justify-between border-b border-white/20 pb-2">
            <span className="text-gray-300">Status</span>
            <span className="font-semibold">{user?.accountStatus}</span>
          </div>

        </div>

      </div>

    </div>
  );
}