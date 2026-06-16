import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import ConvertModal from "../components/ConvertModal";
import RenameModal from "../components/RenameModal";
import { saveAs } from "file-saver";

export default function UploadedFiles() {

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [renameModal, setRenameModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  // ================= Fetch Files =================
  const fetchFiles = async () => {
    try {
      const res = await API.get("/files/uploaded");
      setFiles(res.data);
    } catch {
      toast.error("Failed to load files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ================= Upload (WITH VALIDATION) =================
  const uploadFile = async (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, DOC, TXT, JPG, PNG allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Max file size is 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/files/upload", formData);
      toast.success("File uploaded");
      fetchFiles();
    } catch {
      toast.error("Upload failed");
    }
  };

  // ================= Delete =================
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
      saveAs(res.data, file.originalName);
    } catch {
      toast.error("Download failed");
    }
  };

  // ================= File Type Helper =================
  const getFileType = (name) => {
    if (name.match(/\.jpg$/i) || name.match(/\.jpeg$/i)) return "jpg";
    if (name.match(/\.png$/i)) return "png";
    if (name.match(/\.pdf$/i)) return "pdf";
    if (name.match(/\.docx?$/i)) return "doc";
    if (name.match(/\.txt$/i)) return "text";
    return "other";
  };

  // ================= Filter + Sort =================
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

      {/* ================= Upload Section ================= */}
      <div className="bg-gray-900 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h2 className="text-xl font-semibold">Upload File</h2>
          <p className="text-gray-400 text-sm">
            Allowed: PDF, DOC, TXT, JPG, PNG (Max 10MB)
          </p>
        </div>

        <input
          type="file"
          id="uploadFile"
          className="hidden"
          onChange={(e) => uploadFile(e.target.files[0])}
        />

        <button
          onClick={() => document.getElementById("uploadFile").click()}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-105 transition"
        >
          Upload File
        </button>

      </div>

      {/* ================= Toolbar ================= */}
      <div className="flex flex-col gap-4">

        <div className="flex flex-col md:flex-row md:items-center gap-2">

          <h2 className="text-2xl font-bold flex-1">
            Uploaded Files
          </h2>

          <b>Search</b><input
            type="text"
            placeholder="🔍 Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 p-2.5 bg-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

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

      </div>

      {/* ================= File List ================= */}
      <div className="space-y-3">

        {processedFiles.length === 0 ? (
          <p className="text-gray-400">No files found</p>
        ) : (
          processedFiles.map(file => (
            <div
              key={file._id}
              className="bg-gray-900 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-800 transition"
            >

              <div className="flex flex-col">
                <h3 className="font-semibold text-lg truncate">
                  {file.originalName}
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
                  onClick={() =>
                    window.open(`http://localhost:5000/api/files/view/${file._id}`)
                  }
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
                  onClick={() => setRenameModal(file)}
                  className="px-3 py-1 bg-yellow-600 rounded-md text-sm"
                >
                  Rename
                </button>

                <button
                  onClick={() => setSelectedFile(file)}
                  className="px-3 py-1 bg-purple-600 rounded-md text-sm"
                >
                  Convert
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

      {/* ================= Modals ================= */}
      {selectedFile && (
        <ConvertModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          refresh={fetchFiles}
        />
      )}

      {renameModal && (
        <RenameModal
          file={renameModal}
          refresh={fetchFiles}
          onClose={() => setRenameModal(null)}
        />
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">

            <h3 className="text-lg font-semibold mb-3">
              Confirm Delete
            </h3>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete {" "}
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


