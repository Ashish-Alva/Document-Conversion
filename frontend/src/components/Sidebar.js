export default function Sidebar({ setTab, tab }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const active =
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg";

  const normal =
    "text-gray-400 hover:text-white hover:bg-white/5";

  return (

    <div className="w-64 min-h-screen bg-gray-950 border-r border-white/10 p-6 flex flex-col">

      {/* Logo */}
      <h2 className="text-xl font-bold mb-10 tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        DocConvert
      </h2>


      {/* Menu */}
      <div className="space-y-3">

        {/* USER MENU */}
        {user?.role === "user" && (

          <>
            <button
              onClick={() => setTab("uploaded")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === "uploaded" ? active : normal
              }`}
            >
              Uploaded Files
            </button>

            <button
              onClick={() => setTab("converted")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === "converted" ? active : normal
              }`}
            >
              Converted Files
            </button>

            <button
              onClick={() => setTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === "profile" ? active : normal
              }`}
            >
              Profile
            </button>
          </>
        )}


        {/* ADMIN MENU */}
        {user?.role === "admin" && (

          <>
            <button
              onClick={() => setTab("admin")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === "admin" ? active : normal
              }`}
            >
              Users
            </button>

            <button
              onClick={() => setTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === "profile" ? active : normal
              }`}
            >
              Profile
            </button>
          </>
        )}

      </div>

    </div>

  );
}