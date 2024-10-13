const express = require("express");
const {
  sendOtp,
  verifyOtp,
  createPassword,
  signIn,
  signOut
} = require("../controllers/authController");
const verifySessionToken = require('../middlewares/tokenChecker');
const router = express.Router();


router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/create-password", createPassword);
router.post("/sign-in", signIn);
router.post("/sign-out", verifySessionToken , signOut);

module.exports = router;
