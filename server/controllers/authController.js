const { Auth } = require("../models");
const {
  successResponseWithData,
  validationErrorWithData,
} = require("../helpers/responseHandlers");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { sendOTP } = require("../helpers/email");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return validationErrorWithData(res, "Email is required", {
      field: "email",
    });
  }

  try {
    const existingUser = await Auth.findOne({
      where: { session_email: email },
    });
    if (existingUser) {
      return validationErrorWithData(res, "User already exists", {
        field: "email",
      });
    }

    const otp = crypto.randomInt(100000, 999999);
    const otpExpiry = new Date(Date.now() + 1000 * 60 * 10);

    await sendOTP(email, otp);

    const sessionId = uuidv4();

    await Auth.create({
      session_id: sessionId,
      session_email: email,
      session_otp: otp.toString(),
      session_otp_expires_at: otpExpiry,
      session_is_verified: false,
    });

    return successResponseWithData(res, "OTP has been sent to your email", {
      email,
    });
  } catch (error) {
    return errorResponse(res, "Internal Server Error");
  }
};
