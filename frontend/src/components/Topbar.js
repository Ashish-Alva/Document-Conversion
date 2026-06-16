import { useState } from "react";

export default function Topbar({ tab }) {

  const [show, setShow] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  

  return (

    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-gray-950">

      {/* Left Section */}
      <div>

        <h2 className="text-lg font-semibold">
          Hello! {user?.name}
        </h2>

        {/* <p className="text-sm text-gray-400">
          Hello! {user?.name}
        </p> */}

        

      </div>


      {/* Right Section */}
      <div className="flex items-center gap-4">


        {/* Email */}
        <div className="text-sm text-gray-400">
          {user?.email}
        </div>

        {/* Logout */}
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
          onClick={() => setShow(true)}
        >
          Logout
        </button>

      </div>


      {/* Logout Modal */}
      {show && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

          <div 
            className="absolute inset-0 bg-black/70"
            onClick={() => setShow(false)}
          />

          <div className="relative bg-gray-900 p-6 rounded-xl w-80 border border-white/10">

            <h3 className="text-lg font-semibold mb-3">
              Confirm Logout
            </h3>

            <div className="flex justify-end gap-3">

              <button
                className="px-4 py-2 bg-gray-700 rounded"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={logout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}