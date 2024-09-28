const express = require('express');
const { sendOtp, verifyOtpAndSetPassword, login } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSetPassword);
router.post('/login', login);

module.exports = router;
