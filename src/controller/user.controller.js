const User = require("../models/user.model");
const generateJWT = require("../utils/jws");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    const token = await generateJWT(user.id);
    res.status(200).json({
      status: "Sucess",
      message: "User Created with exited",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "Failed ",
      message: "Failed create user",
      error,
    });
  }
};

exports.findUserAll = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({
      status: "sucess",
      message: "User GRN",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed ",
      message: "Failed create user",
      error,
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      status: "success",
      message: "user successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });
    return res.status(200).json({
      status: "success",
      message: "exit update data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: "notavailable" });
    return res.status(200).json({
      status: "success",
      message: "Change mode notavailable",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect email or password",
    });
  }
  const token = await generateJWT(user.id);
  res.status(200).json({
    status: "success",
    token,
    user,
  });
};
