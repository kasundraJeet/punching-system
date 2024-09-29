const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const { sendOTP } = require("../helpers/email");
const { errorResponse } = require("../helpers/responseHandlers");
const { generateOTP } = require("../helpers/otp");
const { Op } = require("sequelize");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser && existingUser.isVerified) {
    //   return res
    //     .status(400)
    //     .json({ message: "User already exists and is verified" });
    // }

    // const otp = generateOTP();

    // const otpExpires = Date.now() + 5 * 60 * 1000;

    // if (existingUser) {
    //   await User.update({ otp, otpExpires }, { where: { email } });
    // } else {
    //   await User.create({ email, otp, otpExpires, role: "user" });
    // }

    // await sendOTP(email, otp);

    // res.status(200).json({ message: "OTP sent to email" });
  } catch (e) {
    errorResponse(res, `Error sending OTP`);
  }
};
