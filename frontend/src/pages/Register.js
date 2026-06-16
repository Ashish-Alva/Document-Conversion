import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const[phonenumber,setPhonenumber]=useState("")
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      await API.post("/auth/register", {
        name,
        email,
        phonenumber,
        password,
        cpassword
      });

      toast.success("Registration successful");

      navigate("/");

    } catch (error) {

      toast.error(error.response?.data?.message || "Registration failed");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">

      {/* Floating Glow */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse top-10 left-10 pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse bottom-10 right-10 pointer-events-non"></div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 relative z-50">

        <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          DocConvert
        </h1>

        <button
          className="text-gray-300 hover:text-white transition"
          onClick={() => navigate("/")}
        >
          Login
        </button>

      </div>

      {/* Main Section */}
      <div className="flex items-center justify-center h-[80vh] px-10 relative z-10">

        {/* Left Section */}
        <div className="flex-1">

          <h1 className="text-5xl font-bold mb-6 leading-tight">

            <span className="block">
              Create Your Account
            </span>

            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Start Converting Today
            </span>

          </h1>

          <p className="text-gray-400 text-lg max-w-md mb-6">
            Join our powerful document conversion platform 
            with modern UI and fast performance.
          </p>

          
        </div>


        {/* Right Section */}
        <div className="flex-1 flex justify-center">

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-96 hover:scale-[1.02] transition duration-300">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Register
            </h2>

            <form onSubmit={handleRegister}>

              {/* Name */}
              <label className="w-full p-3 mb-10 ">Name </label>
              <div className="mb-4 flex items-center bg-black/40 border border-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-blue-400">
                
                <FaUser className="mr-2 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="bg-transparent outline-none w-full text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <label className="w-full p-3 mb-10 ">Email </label>
              <div className="mb-4 flex items-center bg-black/40 border border-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-blue-400">
                <FaEnvelope className="mr-2 text-gray-400"/>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="bg-transparent outline-none w-full text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone number */}
              <label className="w-full p-3 mb-10 ">Phone Number </label>
              <div className="mb-6 flex items-center bg-black/40 border border-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 hover:border-purple-400">
                <FaPhone className="mr-2 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="bg-transparent outline-none w-full text-white"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <label className="w-full p-3 mb-10 ">Password </label>
              <div className="mb-6 flex items-center bg-black/40 border border-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 hover:border-purple-400">
                <FaLock className="mr-2 text-gray-400"/>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-transparent outline-none w-full text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/*Confirm Password */}
              <label className="w-full p-3 mb-10 ">Confirm Password </label>
              <div className="mb-6 flex items-center bg-black/40 border border-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 hover:border-purple-400">
                <FaLock className="mr-2 text-gray-400"/>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="bg-transparent outline-none w-full text-white"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded-lg hover:opacity-90 transition shadow-lg"
              >
                {loading ? "Registering..." : "Register"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}