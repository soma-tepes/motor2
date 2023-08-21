const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.existUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return next(
      new AppError(`El usuario con este email ${id} not exist!`),
      404
    );
  }
  req.user = user;
  next();
});

exports.existUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: "available",
    },
  });
  if (!user) {
    return next(
      new AppError(`El usuario con este email ${email} not exist!`),
      404
    );
  }
  req.user = user;
  next();
});
