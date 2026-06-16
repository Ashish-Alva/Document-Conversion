import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Profile() {

  const [user, setUser] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [phonenumber,setPhonenumber]=useState("")
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const fetchProfile = async () => {
    try {

      const res = await API.get("/user/profile");
      setUser(res.data);
      setEmail(res.data.email);
      setPhonenumber(res.data.phonenumber)

    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


// const updateProfile = async () => {
//   try {

//     const res=await API.put("/user/update", { email ,phonenumber});
//     // await API.put("/user/update",{phonenumber});

//     toast.success(res.data.message);

//     // Update localStorage user
//     const user = JSON.parse(localStorage.getItem("user"));
//     user.email = email;
//     user.phonenumber=phonenumber;
//     localStorage.setItem("user", JSON.stringify(user));

//     setShowUpdate(false);
//     fetchProfile();

//     window.location.reload();

//   } catch {
//     toast.error("Update failed");
//   }
// };


const updateProfile = async () => {
  try {
    const res = await API.put("/user/update", { email, phonenumber });

    toast.success(res.data.message);

    // Update localStorage safely
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const updatedUser = {
        ...storedUser,
        email,
        phonenumber,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setShowUpdate(false);

    fetchProfile();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Update failed"
    );
  }
};



const changePassword = async () => {
  try {
    // Basic frontend validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return toast.error("All fields are required");
    }

    const res = await API.put("/user/change-password", {
      oldPassword,
      newPassword,
      confirmNewPassword,
    });

    toast.success(res.data.message);

    // Clear fields
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowPassword(false);

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Password update failed"
    );
  }
};


return (

  <div className="min-h-[75vh] flex items-center justify-center">

    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 shadow-lg">

      <h2 className="text-3xl font-bold text-center mb-8">
        Profile
      </h2>


      {/* Avatar */}
      <div className="flex justify-center mb-6">

        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>


      {/* Details */}
      <div className="text-center mb-8">

        <p className="text-xl font-semibold">
          {user.name}
        </p>

        <p className="text-gray-400">
          {user.email}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {user.phonenumber}
        </p>

      </div>


      {/* Divider */}
      <div className="border-t border-white/10 mb-6"></div>


      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-8">

        <button
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setShowUpdate(true);
            setShowPassword(false);
          }}
        >
          Update Profile
        </button>

        <button
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          onClick={() => {
            setShowPassword(true);
            setShowUpdate(false);
          }}
        >
          Change Password
        </button>

      </div>


      {/* Update Profile */}
      {showUpdate && (

        <div className="max-w-md mx-auto">
          <label className="w-full p-3 mb-10 ">New Email </label>
          <input
            type="text"
            placeholder="Enter New Email"
            className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="w-full p-3 mb-10 ">New Phone Number </label>
          <input
            type="text"
            placeholder="Enter New Phone number"
            className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 mb-4"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />

          <button
            className="w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
            onClick={updateProfile}
          >
            Save Changes
          </button>

        </div>

      )}


      {/* Change Password */}
      {showPassword && (

        <div className="max-w-md mx-auto">
          <label className="w-full p-3 mb-10 ">Old Password </label>
          <input
            type="password"
            placeholder="Old Password"
            className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 mb-3"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label className="w-full p-3 mb-10 ">New Password </label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="w-full p-3 mb-10 ">Confirm New Password </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 mb-4"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button
            className="w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
            onClick={changePassword}
          >
            Update Password
          </button>

        </div>

      )}

    </div>

  </div>

);
}