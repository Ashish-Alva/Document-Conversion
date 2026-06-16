import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import RenameModal from "../components/RenameModal";

export default function ConvertedFiles() {

  const [files, setFiles] = useState([]);
  const [renameModal, setRenameModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ FIX: Missing states
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  // ✅ FIX: Missing helper
  const getFileType = (name) => {
    if (name.match(/\.jpg$/i) || name.match(/\.jpeg$/i)) return "jpg";
    if (name.match(/\.png$/i)) return "png";
    if (name.match(/\.pdf$/i)) return "pdf";
    if (name.match(/\.docx?$/i)) return "doc";
    if (name.match(/\.txt$/i)) return "text";
    return "other";
  };

  // ================= Fetch Files =================
  const fetchFiles = async () => {
    try {
      const res = await API.get("/files/converted");
      setFiles(res.data);
    } catch {
      toast.error("Failed to load files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ================= DELETE =================
  const confirmDelete = async () => {
    try {
      await API.delete(`/files/${deleteTarget._id}`);
      toast.success("Deleted");
      setDeleteTarget(null);
      fetchFiles();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= Download =================
  const downloadFile = async (file) => {
    try {
      const res = await API.get(`/files/download/${file._id}`, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", file.convertedFileName || file.originalName);

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch {
      toast.error("Download failed");
    }
  };

  // ================= View =================
  const viewFile = (file) => {
    window.open(
      `http://localhost:5000/api/files/view/${file._id}`,
      "_blank"
    );
  };

  // ================= Rename =================
  const renameFile = (file) => {
    setRenameModal(file);
  };

  // ✅ FIX: Use ONLY ONE processed list
  const processedFiles = files
    .filter(file =>
      file.originalName.toLowerCase().includes(search.toLowerCase())
    )
    .filter(file => {
      if (filter === "all") return true;
      return getFileType(file.originalName) === filter;
    })
    .sort((a, b) => {
      if (sort === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "name") return a.originalName.localeCompare(b.originalName);
      return 0;
    });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">

        <div className="flex-1">
          <h2 className="text-2xl font-bold">Converted Files</h2>
          <p className="text-gray-400 text-sm">
            View and manage converted documents
          </p>
        </div>

        <b>Search</b>
        <input
          type="text"
          placeholder="🔍 Search converted files..."
          className="w-full md:w-80 p-2.5 bg-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">

        {["all", "jpg", "png", "pdf", "doc", "text"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm uppercase ${
              filter === type
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {type}
          </button>
        ))}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ml-auto bg-gray-900 p-2 rounded-lg"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
        </select>

      </div>

      {/* File List */}
      <div className="space-y-3">

        {processedFiles.length === 0 ? (
          <p className="text-gray-400">No converted files</p>
        ) : (
          processedFiles.map(file => (
            <div
              key={file._id}
              className="bg-gray-900 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-800 transition"
            >

              <div className="flex flex-col">
                <h3 className="font-semibold text-lg truncate">
                  {file.convertedFileName || file.originalName}
                </h3>

                <p className="text-gray-400 text-sm">
                  {new Date(file.createdAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => viewFile(file)}
                  className="px-3 py-1 bg-blue-600 rounded-md text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => downloadFile(file)}
                  className="px-3 py-1 bg-green-600 rounded-md text-sm"
                >
                  Download
                </button>

                <button
                  onClick={() => renameFile(file)}
                  className="px-3 py-1 bg-yellow-600 rounded-md text-sm"
                >
                  Rename
                </button>

                <button
                  onClick={() => setDeleteTarget(file)}
                  className="px-3 py-1 bg-red-600 rounded-md text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* Rename Modal */}
      {renameModal && (
        <RenameModal
          file={renameModal}
          refresh={fetchFiles}
          onClose={() => setRenameModal(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">

            <h3 className="text-lg font-semibold mb-3">
              Confirm Delete
            </h3>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                {deleteTarget.originalName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}