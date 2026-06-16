import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function RenameModal({ file, onClose, refresh }) {

  const ext = file.originalName.split(".").pop();
  const baseName = file.originalName.replace(`.${ext}`, "");

  const [name, setName] = useState(baseName);
  const [loading, setLoading] = useState(false);

  const rename = async () => {

    if (!name.trim()) return toast.error("Enter file name");

    try {

      setLoading(true);

      await API.put(`/files/rename/${file._id}`, {
        name: `${name}.${ext}`
      });

      toast.success("Renamed");

      refresh();
      onClose();

    } catch {
      toast.error("Rename failed");
    }

    setLoading(false);
  };

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

        <h2 className="text-xl font-semibold mb-3">
          Rename File
        </h2>

        <div className="flex mb-6">

          <input
            className="flex-1 p-3 bg-gray-950 rounded-l-lg outline-none focus:ring-0 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="px-3 flex items-center bg-gray-800 border border-l-0 border-white/10 rounded-r-lg">
            .{ext}
          </div>

        </div>

        <div className="flex justify-end gap-3">

          <button
            className="px-4 py-2 bg-gray-600 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 rounded-lg"
            onClick={rename}
          >
            {loading ? "Renaming..." : "Rename"}
          </button>

        </div>

      </div>

    </div>

  );
}