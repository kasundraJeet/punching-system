const { Auth, User } = require("../models");
const {
  successResponseWithData,
  validationErrorWithData,
  errorResponse,
  successResponse,
} = require("../helpers/responseHandlers");

exports.puchIn = async (req, res) => {
  const { puchStatus } = req.body;

  if (!puchStatus) {
    return validationErrorWithData(res, "Puch status is required", {
      field: "puchStatus",
    });
  }
};
