import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/admin/users");
      const listingRes = await API.get("/admin/listings");

      setUsers(userRes.data.data);
      setListings(listingRes.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard 🛠</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow">
    <h2>Total Users</h2>
    <p className="text-3xl font-bold">{users.length}</p>
  </div>

  <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow">
    <h2>Total Listings</h2>
    <p className="text-3xl font-bold">{listings.length}</p>
  </div>

</div>

      {/* USERS */}
      {/*<h2 className="text-xl font-semibold mb-4">Recent Users</h2>*/}

      {/*{users.slice(0, 5).map((user) => (
        <div key={user._id} className="bg-white p-3 mb-2 rounded shadow">
          {user.email}
        </div>
      ))}*/}
      <div className="bg-white rounded-xl shadow p-4">
  <h2 className="text-xl font-semibold mb-4">Recent Users</h2>

  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="border-b">
        <th className="p-2">Email</th>
        <th className="p-2">Role</th>
        <th className="p-2">Status</th>
      </tr>
    </thead>

    <tbody>
      {users.slice(0, 5).map((user) => (
        <tr key={user._id} className="border-b hover:bg-gray-50">

          <td className="p-2">{user.email}</td>

          {/* 🔥 ROLE TAG */}
          <td className="p-2">
            {user.role === "admin" ? (
  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">
    Admin
  </span>
) : user.role === "seller" ? (
  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
    Seller
  </span>
) : (
  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
    Buyer
  </span>
)}
          </td>

          {/* 🔥 STATUS */}
          <td className="p-2">
            {user.accountStatus === "blocked" ? (
              <span className="text-red-500">Blocked</span>
            ) : (
              <span className="text-green-600">Active</span>
            )}
          </td>

        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}