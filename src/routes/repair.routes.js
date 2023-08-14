const express = require("express");
const repairController = require("../controller/repair.controller");
const validatorMiddlewares = require("../middlewares/validation.middleware");
const repairMiddleware = require("../middlewares/repair.middleware");
const authMidleWare = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(authMidleWare.protect);
router
  .route("/")
  .get(authMidleWare.restrictTo("employee"), repairController.findRepair)
  .post(
    validatorMiddlewares.createRepairValidation,
    repairController.createRepair
  );

router
  .use("/:id", repairMiddleware.existRepair)
  .use(authMidleWare.restrictTo("employee"))
  .route("/:id")
  .get(repairController.findRepairID)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
