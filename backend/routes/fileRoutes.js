const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadFile,
  getUploadedFiles,
  deleteFile,
  getConvertedFiles,
  renameFile,
  downloadFile,
  viewFile
} = require("../controllers/fileController");

router.post("/upload", auth, upload.single("file"), uploadFile);

router.get("/uploaded", auth, getUploadedFiles);

router.delete("/:id", auth, deleteFile);

router.get("/converted", auth, getConvertedFiles);

router.put("/rename/:id", auth, renameFile);

router.get("/view/:id", viewFile);

router.get("/download/:id", downloadFile);

module.exports = router;