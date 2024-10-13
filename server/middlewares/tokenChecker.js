const { Auth } = require("../models");
const {
  errorResponse,
  unauthorizedResponse,
} = require("../helpers/responseHandlers");

const verifySessionToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return unauthorizedResponse(res, "Session token is required");
  }

  try {
    const session = await Auth.findOne({
      where: {
        session_token: token,
      },
    });

    if (!session) {
      return unauthorizedResponse(res, "Invalid session token");
    }

    if (new Date() > session.session_expires_at) {
      return unauthorizedResponse(res, "Session token has expired");
    }

    req.session = session;
    next();
  } catch (e) {
    console.log(e);
    return errorResponse(res, "Internal Server Error");
  }
};

module.exports = verifySessionToken;
