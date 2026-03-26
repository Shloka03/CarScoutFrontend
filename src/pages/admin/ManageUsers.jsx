import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data.data);
  };

  const blockUser = async (id) => {
  try {
    const res = await API.put(`/admin/block/${id}`);
    console.log(res.data); // 🔥 DEBUG
    fetchUsers();
  } catch (err) {
    console.log(err.response?.data); // 🔥 SEE ERROR
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    
    <div className="grid md:grid-cols-2 gap-4">

  {users.map((user) => (
    <div
      key={user._id}
      className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
    >

      <div>

        {/* EMAIL */}
        <p className="font-semibold">{user.email}</p>

        {/* ROLE */}
        <p className="text-sm mt-1">
          Role:
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
        </p>

        {/* STATUS */}
        <p className="text-sm">
          Status:
          {user.accountStatus === "blocked" ? (
            <span className="ml-2 text-red-500">Blocked</span>
          ) : (
            <span className="ml-2 text-green-600">Active</span>
          )}
        </p>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => blockUser(user._id)}
        disabled={user.accountStatus === "blocked" || user.role === "admin"}
        className={`px-4 py-2 rounded text-white ${
          user.accountStatus === "blocked" || user.role === "admin"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {user.role === "admin"
  ? "Admin"
  : user.accountStatus === "blocked"
  ? "Blocked"
  : "Block"}
      </button>

    </div>
  ))}

</div>

  );
}