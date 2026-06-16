const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  toggleUserStatus,
  getStats,
} = require("../controllers/adminController");

router.get("/users", auth, admin, getAllUsers);

router.put("/toggle/:id", auth, admin, toggleUserStatus);

router.get("/stats", auth, admin, getStats);

module.exports = router;