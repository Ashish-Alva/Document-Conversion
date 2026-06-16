const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  isConverted: { type: Boolean, default: false },
  convertedFileName: { type: String },
  convertedFilePath: { type: String },
  convertedFileType: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);
