const { Auth, User, PunchRecord } = require("../models");
const {
  successResponseWithData,
  validationErrorWithData,
  errorResponse,
} = require("../helpers/responseHandlers");

exports.punchIn = async (req, res) => {
  const { punchStatus } = req.body;
  if (!punchStatus) {
    return validationErrorWithData(res, "Punch status is required", {
      field: "punchStatus",
    });
  }

  const token = req.headers.token;

  try {
    const session = await Auth.findOne({
      where: { session_token: token },
      include: [{ model: User, as: "user" }]
    });

    if (!session) {
      return errorResponse(res, "Invalid session token");
    }

    const user_id = session.dataValues.session_user_id;

    if (!user_id) {
      return errorResponse(res, "User ID not found in session");
    }

    if (punchStatus == 1) {
      await PunchRecord.create({
        user_id,
        punch_in: new Date(),
        status: 1,
        punch_date: new Date().toISOString().split('T')[0],
      });

      return successResponseWithData(res, "Punch-in successful", { user_id });
    } else if (punchStatus == 2) {
      const punchRecord = await PunchRecord.findOne({
        where: { user_id, status: 1 },
        order: [['createdAt', 'DESC']],
      });

      if (!punchRecord) {
        return errorResponse(res, "No active punch-in record found");
      }

      punchRecord.punch_out = new Date();
      punchRecord.status = 2;
      await punchRecord.save();

      return successResponseWithData(res, "Punch-out successful", { user_id });
    }

    return validationErrorWithData(res, "Invalid punch status", { punchStatus });
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Internal Server Error");
  }
};