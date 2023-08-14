const { DataTypes } = require("sequelize");

const { db } = require("../basedata/config");
const bcrypt = require("bcryptjs");

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("client", "employee"),
      allowNull: false,
      defaultValue: "client",
    },
    status: {
      type: DataTypes.ENUM("available", "notavailable"),
      allowNull: false,
      defaultValue: "available",
    },
  },

  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(user.password, salt);
        user.password = secretPassword;
      },
    },
  }
);

module.exports = User;
