const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Auth = sequelize.define(
  "session",
  {
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session_user_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_fcm_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    session_otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session_otp_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    session_is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "sessions",
  }
);

module.exports = Auth;
