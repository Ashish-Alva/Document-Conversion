import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ userCount: 0, fileCount: 0, conversionCount: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const resUsers = await API.get("/admin/users");
      setUsers(resUsers.data);

      const resStats = await API.get("/admin/stats");
      setStats(resStats.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchData();
    }
  }, [user]);

  const toggleUser = async (id) => {
    try {

      await API.put(`/admin/toggle/${id}`);

      toast.success("User updated");
      fetchData();

    } catch {
      toast.error("Update failed");
    }
  };

  return (

    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-lg">
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Total Users</p>
          <h3 className="text-3xl font-bold">{stats.userCount}</h3>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-lg">
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Total Files</p>
          <h3 className="text-3xl font-bold">{stats.fileCount}</h3>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-lg">
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Total Conversions</p>
          <h3 className="text-3xl font-bold">{stats.conversionCount}</h3>
        </div>

      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Users
          </h2>

          <p className="text-gray-400 mt-1">
            Manage registered users
          </p>
        </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">
              <b>Search</b>
            </span>

            <input
              type="text"
              placeholder="🔍 Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 p-2.5 bg-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

      </div>


      {/* Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-white/5 border-b border-white/10">

            <tr>

              <th className="text-center p-4 text-gray-400 w-1/4">
                Name
              </th>

              <th className="text-center p-4 text-gray-400 w-2/5">
                Email
              </th>

              <th className="text-center p-4 text-gray-400 w-1/6">
                Role
              </th>

              <th className="text-center p-4 text-gray-400 w-1/6">
                Status
              </th>

              <th className="text-center p-4 text-gray-400 w-1/6">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            
              {Array.isArray(users) && users.filter(user =>
                (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.email || "").toLowerCase().includes(search.toLowerCase())
              ).map(user => (

              <tr
                key={user._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="p-4 text-center w-1/4">
                  {user.name}
                </td>

                <td className="p-4 text-center text-gray-400 w-2/5">
                  {user.email}
                </td>

                <td className="p-4 text-center text-sm w-1/6">
                  {user.role?.toUpperCase()}
                </td>

                <td className="p-4 text-center w-1/6">

                  {user.isActive ? (
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
                      Inactive
                    </span>
                  )}

                </td>

                <td className="p-4 text-center w-1/6">

                  <button
                    className={`w-28 py-1 rounded-lg transition ${
                      user.isActive
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowConfirm(true);
                    }}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Confirmation Modal */}
      {showConfirm && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          <div className="relative bg-gray-900 p-6 rounded-xl w-96 border border-white/10">

            <h3 className="text-lg font-semibold mb-3">
              {selectedUser?.isActive ? "Deactivate User" : "Activate User"}
            </h3>

            <p className="text-gray-400 mb-6">
              Are you sure you want to 
              {selectedUser?.isActive ? " deactivate " : " activate "}
              {<span className="text-white font-medium">
               {selectedUser?.name}?
              </span>}
            </p>

            <div className="flex justify-end gap-3">

              <button
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className={`px-4 py-2 rounded ${
                  selectedUser?.isActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => {
                  toggleUser(selectedUser._id);
                  setShowConfirm(false);
                }}
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}