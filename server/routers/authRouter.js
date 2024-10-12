const express = require("express");
const {
  sendOtp,
  verifyOtp,
  createPassword,
  signIn,
} = require("../controllers/authController");
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/create-password", createPassword);
router.post("/sign-in", signIn);

module.exports = router;
