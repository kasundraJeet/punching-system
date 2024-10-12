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
  console.log(req.body)

  if (!email) {
    return validationErrorWithData(res, "Email is required", {
      field: "email",
    });
  }

  try {
    return successResponseWithData(res, "OTP has been sent to your email", {
      email,
    });
  } catch (e) {
    return errorResponse(res, "Internal Server Error");
  }
};
