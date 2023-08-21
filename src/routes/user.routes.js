const express = require("express");

const userController = require("../controller/user.controller");
const userMiddlewares = require("../middlewares/user.middleware");
const validatorMiddlewares = require("../middlewares/validation.middleware");
const authMidleWare = require("../middlewares/auth.middleware");
const router = express.Router();

router
  .route("/")
  .get(authMidleWare.protect, userController.findUserAll)
  .post(validatorMiddlewares.createUserValidation, userController.createUser);

router.post("/login", userMiddlewares.existUserEmail, userController.login);

router.use(authMidleWare.protect);
router
  .use("/:id", userMiddlewares.existUser)
  .route("/:id")
  .get(userController.findUser)
  .patch(authMidleWare.protectAccountOwner, userController.updateUser)
  .delete(authMidleWare.protectAccountOwner, userController.deleteUser);

module.exports = router;
