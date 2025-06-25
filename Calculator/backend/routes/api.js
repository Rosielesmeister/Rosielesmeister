const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  calculate,
  fetchHistory,
} = require("../controllers/calculationController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/calculate", auth, calculate);
router.get("/history", auth, fetchHistory);

module.exports = router;
