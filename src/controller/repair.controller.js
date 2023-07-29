const Repair = require("../models/repair.model");
const User = require("../models/user.model");

exports.findRepair = async (req, res) => {
  try {

    const repair = await Repair.findAll({
      where:{
        status: "pending",
      }
    });
   return  res.status(200).json({
      status: "sucess",
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
    const { userid, date } = req.body;
    const user = await User.findOne({ where: { id: userid } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const repair = await Repair.create({ userid, date, status: "pending" });
    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cita", error });
  }
};

 exports.findRepairID = async (req, res) => {
  try {
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
    return res.status(200).json({
      status: "success",
      message: "¡Reparación encontrada exitosamente!",
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
  } catch (error) {}
};
exports.deleteRepair = async (req, res) => {
  try {

    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
    if (!repair) {
      return res.status(404).json({ message: "Reparación no encontrada" });
    }
    repair.status = "cancelled";
    await repair.save();
    res.status(200).json({ 
      status:'cancelled',
      message: "Reparación cancelada exitosamente" });
  } catch (error) {}
};


