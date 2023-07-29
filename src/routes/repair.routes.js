const express = require("express");
const repairController = require("../controller/repair.controller");

const router = express.Router();
router
  .route("/")
  .get(repairController.findUserAll)
  .post(repairController.createUser);

router
  .route("/:id")
  .get(repairController.findUser)
  .patch(repairController.updateUser)
  .delete(repairController.deleteUser);

module.exports = router;
