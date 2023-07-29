const express = require('express');

const repairController = require("../controller/repair.controller");

const router = express.Router();

router
  .route("/")
  .get(repairController.findRepair)
  .post(repairController.createRepair);

 router
  .route("/:id")
  .get(repairController.findRepairID)
 /*  .patch(repairController.updateUser) */
  .delete(repairController.deleteRepair); 
  module.exports = router;