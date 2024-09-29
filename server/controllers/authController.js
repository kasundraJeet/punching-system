const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendOTP } = require("../helpers/email");
const { generateOTP } = require("../helpers/otp");
const { Op } = require("sequelize");

exports.sendOtp = async (req, res) => {
  console.log("send-otp api callednd")
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.isVerified) {
      return res
        .status(400)
        .json({ message: "User already exists and is verified" });
    }

    const otp = generateOTP();

    const otpExpires = Date.now() + 5 * 60 * 1000;

    if (existingUser) {
      await User.update({ otp, otpExpires }, { where: { email } });
    } else {
      await User.create({ email, otp, otpExpires, role: "user" });
    }


    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

exports.verifyOtpAndSetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
        otp,
        otpExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update(
      {
        password: hashedPassword,
        isVerified: true,
        otp: null,
        otpExpires: null,
      },
      { where: { email } }
    );

    res.status(200).json({ message: "Password set, you can now login" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP or setting password", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, isVerified: true } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found or not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
