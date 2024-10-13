const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const PunchRecord = sequelize.define(
  "PunchRecord",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    punch_in: {
      type: DataTypes.DATE,
    },
    punch_out: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1, 2]],
      },
    },
    punch_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "punch_records",
  }
);

module.exports = PunchRecord;
