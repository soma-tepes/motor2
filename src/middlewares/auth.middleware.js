const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(400).json({ status: "error" });
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: "available",
    },
  });

  if (!user) {
    res.status(400).json({ status: "notavailable" });
  }
  req.sessionUser = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      res.status(400).json({ status: "notavailable" });
    }

    next();
  };
};

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError("You do not own this account.", 401));
  }

  next();
});
