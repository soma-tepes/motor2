const Repair = require("../models/repair.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.findRepair = catchAsync(async (req, res) => {
  const repair = await Repair.findAll({
    where: {
      status: ["pending", "complete"],
    },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });
  return res.status(200).json({
    status: "pending",
    repair,
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { userId, date, description, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    description,
    motorsNumber,
    userid: userId,
  });

  res.status(201).json(repair);
});

exports.findRepairID = catchAsync(async (req, res) => {
  const { repair } = req;
  return res.status(200).json({
    status: "success",
    message: "¡Reparación encontrada !",
    repair,
  });
});
exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: "complete" });
  return res.status(200).json({
    message: "update",
  });
});
exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: "cancelled" });
  res.status(200).json({
    status: "cancelled",
    message: "Reparación cancelada ",
  });
});
