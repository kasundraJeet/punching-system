const express = require('express');
const { sendOtp , verifyOtp, createPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/create-password', createPassword);


module.exports = router;
