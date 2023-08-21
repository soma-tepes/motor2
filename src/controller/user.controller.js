const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const generateJWT = require("../utils/jws");
const bcrypt = require("bcryptjs");

exports.createUser = catchAsync(async (req, res) => {
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
});
exports.findUserAll = catchAsync(async (req, res) => {
  const user = await User.findAll();
  res.status(200).json({
    status: "sucess",
    message: "User GRN",
    user,
  });
});

exports.findUser = catchAsync(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: "success",
    message: "user successfully!",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });
  return res.status(200).json({
    status: "success",
    message: "exit update data",
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: "notavailable" });
  return res.status(200).json({
    status: "success",
    message: "Change mode notavailable",
  });
});

exports.login = catchAsync(async (req, res, next) => {
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
});
