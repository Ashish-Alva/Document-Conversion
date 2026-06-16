const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const conversionRoutes = require("./routes/conversionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/convert", conversionRoutes);
app.use("/api/admin", adminRoutes);

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directories exist
const fs = require("fs");
const uploadDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "uploads", "uploaded"),
  path.join(__dirname, "uploads", "converted"),
];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// MongoDB connection
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Seed Default Admin
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        name: "Default Admin",
        email: "admin@example.com",
        password: hashedPassword,
        phonenumber: "0000000000",
        role: "admin",
        isActive: true
      });
      await admin.save();
      console.log("Default admin user created: admin@example.com / admin123");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

  // Serve React frontend
app.use(express.static(path.join(__dirname, "public")));

// React SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
