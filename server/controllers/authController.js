const { Auth, User } = require("../models");
const {
  successResponseWithData,
  validationErrorWithData,
  errorResponse,
} = require("../helpers/responseHandlers");
const { v4: uuidv4 } = require("uuid");
const { sendOTP } = require("../helpers/email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return validationErrorWithData(res, "Email is required", {
      field: "email",
    });
  }

  try {
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
      sessionId,
    });
  } catch (e) {
    console.log(e);
    return errorResponse(res, "Internal Server Error");
  }
};

exports.verifyOtp = async (req, res) => {
  const { otp, session_id } = req.body;

  if (!otp || !session_id) {
    return validationErrorWithData(res, "OTP and Session ID are required", {
      field: !otp ? "otp" : "session_id",
    });
  }

  try {
    const session = await Auth.findOne({
      where: {
        session_id: session_id,
      },
    });

    if (!session) {
      return errorResponse(res, "Invalid session ID");
    }

    if (new Date() > session.session_otp_expires_at) {
      return errorResponse(res, "OTP has expired");
    }

    if (session.session_otp !== otp) {
      return validationErrorWithData(res, "Invalid OTP", {
        field: "otp",
      });
    }

    session.session_is_verified = true;
    await session.save();

    return successResponseWithData(res, "OTP verified successfully", {
      session_id: session_id,
      email: session.session_email,
    });
  } catch (e) {
    return errorResponse(res, "Internal Server Error");
  }
};

exports.createPassword = async (req, res) => {
  const { password, confirm_password, session_id } = req.body;

  if (!password || !confirm_password || !session_id) {
    return validationErrorWithData(res, "All fields are required", {
      field: !password
        ? "password"
        : !confirm_password
        ? "confirm_password"
        : "session_id",
    });
  }

  if (password !== confirm_password) {
    return validationErrorWithData(res, "Passwords do not match", {
      field: "confirm_password",
    });
  }

  try {
    const session = await Auth.findOne({
      where: {
        session_id: session_id,
        session_is_verified: true,
      },
    });

    if (!session) {
      return errorResponse(res, "Invalid or unverified session");
    }

    const sweetPassword = crypto.randomBytes(16).toString("hex");

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSweetPassword = await bcrypt.hash(sweetPassword, 10);

    session.password = hashedPassword;
    session.sweet_password = hashedSweetPassword;
    await session.save();

    return successResponseWithData(
      res,
      "Password and sweet password created successfully",
      {
        session_id: session_id,
      }
    );
  } catch (e) {
    console.log(e);
    return errorResponse(res, "Internal Server Error");
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return validationErrorWithData(res, "Email and password are required", {
      field: !email ? "email" : "password",
    });
  }

  try {
    const session = await Auth.findOne({
      where: {
        session_email: email,
      },
    });

    if (!session) {
      return errorResponse(res, "Invalid email or password");
    }

    if (!session.session_is_verified) {
      return errorResponse(res, "Session is not verified");
    }

    const isPasswordValid = await bcrypt.compare(password, session.password);

    if (!isPasswordValid) {
      return validationErrorWithData(res, "Invalid email or password", {
        field: "password",
      });
    }

    const lastLogin = new Date();
    session.user_last_login = lastLogin;

    const sessionToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    session.session_token = sessionToken;
    session.session_expires_at = expiresAt;

    let user = await User.findOne({
      where: { email: session.session_email },
    });

    if (!user) {
      user = await User.create({
        id: parseInt(session.dataValues.session_id),
        email: session.session_email,
        user_status: 1,
        is_deleted: false,
      });
    }

    await session.save();

    return successResponseWithData(res, "Login successful", {
      session_id: session.session_id,
      email: session.session_email,
    });
  } catch (e) {
    console.log(e);
    return errorResponse(res, "Internal Server Error");
  }
};
