const User = require("../models/User");
const File = require("../models/File");

exports.getAllUsers = async (req, res) => {
  console.log("Admin requesting all users");
  try {
    const users = await User.find().select("-password");
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  console.log(`Admin requesting delete user: ${req.params.id}`);
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error in deleteUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleUserStatus = async (req, res) => {
  console.log(`Admin requesting toggle user status: ${req.params.id}`);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.error("User not found for toggle");
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive;
    await user.save();
    console.log(`User ${user.email} status toggled to ${user.isActive}`);
    res.json(user);
  } catch (err) {
    console.error("Error in toggleUserStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const fileCount = await File.countDocuments();
    const conversionCount = await File.countDocuments({ isConverted: true });
    res.json({ userCount, fileCount, conversionCount });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
