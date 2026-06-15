const express = require("express")

const {
  registerTeacher,
  loginTeacher,
  updateProfile,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword
} = require("../controllers/authController")

const router = express.Router()

// Register
router.post(
  "/register",
  registerTeacher
)

// Login
router.post(
  "/login",
  loginTeacher
)

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/reset-password",
  resetPassword
);

// Update Profile
router.put(
  "/profile/:id",
  updateProfile
)

// Test Route
router.get(
  "/test",
  (req, res) => {
    res.send("Auth Route Working")
  }
)

router.get(
  "/profile/:id",
  getProfile
);

module.exports = router