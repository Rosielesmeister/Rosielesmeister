const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  calculate,
  fetchHistory,
} = require("../controllers/calculationController");
const { verifyToken } = require("./middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/calculate", verifyToken, calculate);
router.get("/history", verifyToken, fetchHistory);

module.exports = router;
