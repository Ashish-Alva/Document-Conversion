const File = require("../models/File");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.convertFile = async (req, res) => {
  console.log("--- Conversion Request Received ---");
  console.log("Body:", req.body);
  try {
    const { fileId, format } = req.body;
    const file = await File.findById(fileId);

    if (!file) {
      console.error("Error: File not found in DB");
      return res.status(404).json({ message: "File not found" });
    }

    const inputPath = path.normalize(path.join(__dirname, "..", file.filePath));
    console.log("Input Path:", inputPath);
    if (!fs.existsSync(inputPath)) {
      console.error("Error: Input file does not exist on disk:", inputPath);
      return res.status(404).json({ message: "Original file not found on disk" });
    }

    const outputDir = path.normalize(path.join(__dirname, "..", "uploads", "converted"));
    console.log("Output Directory:", outputDir);
    if (!fs.existsSync(outputDir)) {
      console.log("Creating output directory...");
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Detect real file type from magic numbers
    const buffer = Buffer.alloc(8);
    const fd = fs.openSync(inputPath, "r");
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);
    const hexHeader = buffer.toString("hex");

    let realFileType = file.fileType.toLowerCase();
    if (hexHeader.startsWith("25504446")) realFileType = "pdf";
    else if (hexHeader.startsWith("89504e47")) realFileType = "png";
    else if (hexHeader.startsWith("ffd8ff")) realFileType = "jpg";

    console.log(`Detected real file type: ${realFileType} (Header: ${hexHeader})`);

    let targetFormat;
    let scriptName;
    let extraArgs = "";

    // Adjust logic based on REAL file type
    if (realFileType === format.toLowerCase()) {
      // IDENTITY CONVERSION: File is already in the target format (e.g., mislabeled PDF -> PDF)
      targetFormat = format.toLowerCase();
      
      const baseFileName = path.parse(file.originalName).name;
      const outputFileName = `${Date.now()}-${baseFileName}.${targetFormat}`;
      const outputPath = path.join("uploads", "converted", outputFileName);
      const absoluteOutputPath = path.normalize(path.join(__dirname, "..", outputPath));

      console.log("Identity conversion detected. Copying file...");
      fs.copyFileSync(inputPath, absoluteOutputPath);

      file.isConverted = true;
      file.convertedFileName = `${baseFileName}.${targetFormat}`;
      file.convertedFilePath = outputPath;
      file.convertedFileType = targetFormat;
      await file.save();

      return res.json({ message: "File fixed and saved successfully", file });
    }

    if (realFileType === "docx" && format === "pdf-from-docx") {
      targetFormat = "pdf";
      scriptName = "docx_to_pdf.py";
    } else if (realFileType === "pdf" && format === "docx-from-pdf") {
      targetFormat = "docx";
      scriptName = "pdf_to_docx.py";
    } else if (realFileType === "txt" && format === "pdf-from-txt") {
      targetFormat = "pdf";
      scriptName = "txt_to_pdf.py";
    } else if (["png", "jpg", "jpeg"].includes(realFileType) && format === "pdf") {
      targetFormat = "pdf";
      scriptName = "image_to_pdf.py";
    } else if (realFileType === "pdf" && ["png", "jpg", "jpeg"].includes(format.toLowerCase())) {
      targetFormat = format.toLowerCase();
      scriptName = "pdf_to_image.py";
      extraArgs = ` "${targetFormat}"`;
    } else if (["png", "jpg", "jpeg"].includes(realFileType) && ["png", "jpg", "jpeg"].includes(format.toLowerCase())) {
      targetFormat = format.toLowerCase();
      scriptName = "image_to_image.py";
      extraArgs = ` "${targetFormat}"`;
    } else {
      console.error("Error: Mismatch or unsupported. Real Type:", realFileType, "Target:", format);
      return res.status(400).json({ message: `Format mismatch: This file is actually a ${realFileType.toUpperCase()}.` });
    }

    const scriptPath = path.normalize(path.join(__dirname, "..", "python", scriptName));
    
    // Ensure we use the targetFormat for the extension
    const baseFileName = path.parse(file.fileName).name;
    const outputFileName = `${Date.now()}-${baseFileName}.${targetFormat}`;
    
    const outputPath = path.join("uploads", "converted", outputFileName);
    const absoluteOutputPath = path.normalize(path.join(__dirname, "..", outputPath));

    console.log("Target Format:", targetFormat);
    console.log("Generated Output Filename:", outputFileName);
    console.log("Script Path:", scriptPath);
    console.log("Absolute Output Path:", absoluteOutputPath);

    const pythonCmd = process.env.PYTHON_PATH || "python";
    const args = [scriptPath, inputPath, absoluteOutputPath];
    if (extraArgs.trim()) {
      args.push(extraArgs.trim().replace(/"/g, ""));
    }

    console.log(`Executing: ${pythonCmd} ${args.map(a => `"${a}"`).join(" ")}`);

    const { execFile } = require("child_process");
    
    // Log file size before processing
    const stats = fs.statSync(inputPath);
    console.log(`Input file size: ${stats.size} bytes`);

    execFile(pythonCmd, args, async (error, stdout, stderr) => {
      if (error) {
        console.error("--- EXECUTION ERROR ---");
        console.error("Error Message:", error.message);
        console.error("Stderr:", stderr);
        console.error("Stdout:", stdout);
        return res.status(500).json({ 
          message: "Conversion failed", 
          error: stderr || error.message,
          tip: "Check server console for details."
        });
      }

      console.log("--- EXECUTION SUCCESS ---");
      console.log("Stdout:", stdout);

      file.isConverted = true;
      file.convertedFileName = `${path.parse(file.originalName).name}.${targetFormat}`;
      file.convertedFilePath = outputPath;
      file.convertedFileType = targetFormat;
      
      console.log("Saving file metadata to DB...");
      await file.save();
      console.log("Conversion process completed successfully.");

      res.json({ message: "Conversion successful", file });
    });
  } catch (err) {
    console.error("--- UNEXPECTED ERROR ---");
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
