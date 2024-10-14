const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const PunchRecord = sequelize.define(
  "punch_records",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    punch_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    punch_out: {
      type: DataTypes.DATE,
      allowNull: true,
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
