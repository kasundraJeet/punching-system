const express = require('express');
const { sendOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);


module.exports = router;
