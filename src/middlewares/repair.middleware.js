const Repair = require("../models/repair.model");

exports.existRepair = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: "pending",
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: "error",
      message: `¡No se encontró una reparación con el ID ${id}!`,
    });
  }
  req.repair = repair;
  next();
};
