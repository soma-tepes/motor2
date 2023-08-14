const User = require("../models/user.model");

exports.existUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: `product with id ${id} not found!`,
    });
  }
  req.user = user;
  next();
};

exports.existUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: "available",
    },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: `product with email ${email} not found!`,
    });
  }
  req.user = user;
  next();
};
