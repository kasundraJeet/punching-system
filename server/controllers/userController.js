const { User , Auth } = require("../models");
const {
  errorResponse,
  successResponse,
  successResponseWithData
} = require("../helpers/responseHandlers");

exports.UpdateUser = async (req, res) => {
  const { name, phone, address } = req.body;
  const token = req.headers.token;

  try {
    const session = await Auth.findOne({
      where: { session_token: token },
      include: [{ model: User, as: "user" }],
    });

    if (!session) {
      return errorResponse(res, "Invalid session token");
    }

    const user_id = session.dataValues.session_user_id;

    if (!user_id) {
      return errorResponse(res, "User ID not found in session");
    }

    const user = await User.findOne({
      where: {
        id: user_id,
        is_deleted: 0,
      },
    });

    if (user) {
      user.name = name;
      user.phone = phone;
      user.address = address;
      await user.save();

      return successResponse(res, "update sucessfuly");
    } else {
      return errorResponse(res, "user not found");
    }
  } catch (e) {
    console.log(e);
  }
};


exports.detailUser = async (req, res) => {
    const token = req.headers.token;

    try {
        const session = await Auth.findOne({
            where: { session_token: token },
            include: [{ model: User, as: "user" }],
        });

        if (!session) {
            return errorResponse(res, "Invalid session token");
        }

        const user_id = session.dataValues.session_user_id;

        if (!user_id) {
            return errorResponse(res, "User ID not found in session");
        }

        const user = await User.findOne({
            where: {
                id: user_id,
                is_deleted: 0,
            },
            attributes: ['email', 'name', 'phone', 'address'],
        });

        if (user) {
            return successResponseWithData(res, "user fecth sucessfully" , user);
        } else {
            return errorResponse(res, "User not found");
        }
    } catch (e) {
        console.log(e);
        return errorResponse(res, "An error occurred while fetching user details");
    }
};