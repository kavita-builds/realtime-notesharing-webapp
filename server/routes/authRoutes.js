const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");

// ✅ Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Password reset flow
router.post("/forget", forgetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset", resetPassword);

module.exports = router;