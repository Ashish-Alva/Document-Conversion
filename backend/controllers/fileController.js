const File = require("../models/File");
const path = require("path");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const relativePath = path.join("uploads", "uploaded", req.file.filename);

    const newFile = new File({
      userId: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: relativePath,
      fileType: path.extname(req.file.originalname).substring(1),
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUploadedFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id, isConverted: false });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (file.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const absolutePath = path.join(__dirname, "..", file.filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
    
    if (file.convertedFilePath) {
      const absoluteConvertedPath = path.join(__dirname, "..", file.convertedFilePath);
      if (fs.existsSync(absoluteConvertedPath)) {
        fs.unlinkSync(absoluteConvertedPath);
      }
    }

    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getConvertedFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id, isConverted: true });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.renameFile = async (req, res) => {
  try {
    const { name } = req.body;
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    file.originalName = name;
    await file.save();
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const relativePath = file.isConverted ? file.convertedFilePath : file.filePath;
    const downloadName = file.isConverted ? (file.convertedFileName || file.originalName) : file.originalName;
    const absolutePath = path.join(__dirname, "..", relativePath);
    
    console.log(`Downloading file: ${downloadName} from ${absolutePath}`);
    res.download(absolutePath, downloadName);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.viewFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const relativePath = file.isConverted ? file.convertedFilePath : file.filePath;
    const absolutePath = path.join(__dirname, "..", relativePath);
    res.sendFile(path.resolve(absolutePath));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
