const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { convertFile } = require("../controllers/conversionController");

router.post("/convert", auth, convertFile);

module.exports = router;