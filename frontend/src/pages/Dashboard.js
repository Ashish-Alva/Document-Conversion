import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadedFiles from "./UploadedFiles";
import ConvertedFiles from "./ConvertedFiles";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";
import Chatbot from "../components/chatbot/Chatbot";



export default function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const defaultTab = user?.role === "admin" ? "admin" : "uploaded";

  const [tab, setTab] = useState(
    localStorage.getItem("tab") || defaultTab
  );
  const renderTab = () => {

    if (user?.role === "admin") {

      switch (tab) {

        case "admin":
          return <AdminDashboard />

        case "profile":
          return <Profile />

        default:
          return <AdminDashboard />
      }

    }

    // User

    switch (tab) {

      case "uploaded":
        return <UploadedFiles />

      case "converted":
        return <ConvertedFiles />

      case "profile":
        return <Profile />

      default:
        return <UploadedFiles />
    }
  };

    return (

      <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
        
        <Sidebar 
          setTab={(value) => {
            setTab(value);
            localStorage.setItem("tab", value);
          }}
          tab={tab}
        />

        <div className="flex-1 flex flex-col">

          <Topbar tab={tab} />

          <div className="flex-1 p-6 relative">

            {/* Glow Background */}
            <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 top-10 right-10"></div>
            <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 bottom-10 left-10"></div>

            <div className="relative z-10">
              {renderTab()}
            </div>

          </div>
        <Chatbot />
        </div>

      </div>

    );
}