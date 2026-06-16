import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function ConvertModal({ file, onClose, refresh }) {

  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(false);

  const ext = file.originalName.split(".").pop().toLowerCase();

  const getFormats = () => {

    if (["png","jpg","jpeg"].includes(ext)) {

    const formats = [];

    if (ext !== "png") {
        formats.push({ value: "png", label: "PNG" });
    }

    if (ext !== "jpg" && ext !== "jpeg") {
        formats.push({ value: "jpg", label: "JPG" });
    }

    formats.push({ value: "pdf", label: "PDF" });

    return formats;
    }

    if (ext === "pdf") {
      return [
        { value: "docx-from-pdf", label: "PDF → DOCX" }
      ];
    }

    if (ext === "docx") {
      return [
        { value: "pdf-from-docx", label: "DOCX → PDF" }
      ];
    }

    if (ext === "txt") {
      return [
        { value: "pdf-from-txt", label: "TXT → PDF" }
      ];
    }

    return [];
  };

  const convert = async () => {

    if (!format) {
      return toast.error("Select format");
    }

    try {

      setLoading(true);

      await API.post("/convert/convert", {
        fileId: file._id,
        format
      });

      toast.success("Converted successfully");

      refresh();
      onClose();

    } catch {
      toast.error("Conversion failed");
    }

    setLoading(false);
  };

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-2">
          Convert File
        </h2>

        <p className="text-gray-400 text-sm mb-5">
          Select format to convert file: {" "}
          <span className="text-white font-medium">
                {file.originalName}
          </span>
        </p>

        <select
          className="w-full p-3 bg-gray-950 border border-white/10 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >

          <option value="">Select Format</option>

          {getFormats().map(f => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}

        </select>

        <div className="flex justify-end gap-3">

          <button
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            onClick={convert}
          >
            {loading ? "Converting..." : "Convert"}
          </button>

        </div>

      </div>

    </div>
  );
}