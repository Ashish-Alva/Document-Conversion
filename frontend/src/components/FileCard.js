import { useState } from "react";
import { createPortal } from "react-dom";

export default function FileCard({
  file,
  onDelete,
  onConvert,
  onDownload,
  onRename,
  onView
}) {

  const [showDelete, setShowDelete] = useState(false);

  return (

    <>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-4 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">

        <div className="flex justify-between items-center">

          {/* File Info */}
          <div>

            <h3 className="font-semibold text-white text-lg">
              {file.originalName}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {new Date(file.createdAt).toLocaleString()}
            </p>

          </div>


          {/* Actions */}
          <div className="flex gap-2 flex-wrap">

            {onRename && (
              <button
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                onClick={() => onRename(file)}
              >
                Rename
              </button>
            )}

            {onView && (
              <button
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                onClick={() => onView(file)}
              >
                View
              </button>
            )}

            {onDownload && (
              <button
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                onClick={() => onDownload(file)}
              >
                Download
              </button>
            )}

            {onConvert && (
              <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                onClick={() => onConvert(file)}
              >
                Convert
              </button>
            )}

            <button
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg transition"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>

          </div>

        </div>

      </div>


      {/* Delete Modal */}
      {showDelete && createPortal(

  <div className="fixed inset-0 z-[9999] flex items-center justify-center">

    {/* Overlay */}
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setShowDelete(false)}
    />

    {/* Modal */}
    <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

      <h2 className="text-xl font-semibold mb-2 text-white">
        Delete File
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Are you sure you want to delete this file?
      </p>

      <div className="flex justify-end gap-3">

        <button
          className="px-4 py-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-500 transition"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => {
            onDelete(file._id);
            setShowDelete(false);
          }}
        >
          Delete
        </button>

      </div>

    </div>

  </div>,

  document.body

)}

    </>

  );
}