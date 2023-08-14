const Repair = require("../models/repair.model");
const User = require("../models/user.model");

exports.findRepair = async (req, res) => {
  try {
    const repair = await Repair.findAll({
      where: {
        status: "pending",
      },
    });
    return res.status(200).json({
      status: "pending",
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed ",
      message: "Failed create user",
      error,
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { userId, date, description, motorsNumber } = req.body;

    const repair = await Repair.create({
      date,
      description,
      motorsNumber,
      userid: userId,
    });

    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cita", error });
  }
};

exports.findRepairID = async (req, res) => {
  try {
    const { repair } = req;
    return res.status(200).json({
      status: "success",
      message: "¡Reparación encontrada !",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al buscar la reparación por ID",
      error,
    });
  }
};
exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: "complete" });
    return res.status(200).json({
      message: "update",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al buscar la reparación por ID",
      error,
    });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: "cancelled" });
    res.status(200).json({
      status: "cancelled",
      message: "Reparación cancelada ",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al buscar la reparación por ID",
      error,
    });
  }
};
