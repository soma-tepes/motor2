const Repair = require("../models/repair.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.existRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: "pending",
    },
  });
  if (!repair) {
    return next(
      new AppError(`¡No se encontró una reparación con el ID ${id}!`, 404)
    );
  }
  req.repair = repair;
  next();
});
