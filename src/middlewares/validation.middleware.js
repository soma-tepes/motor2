const { validationResult, body } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createLoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannoot be null")
    .isEmail()
    .withMessage("Email must be a correct form"),
  body("password").notEmpty().withMessage("Email cannoot be null"),
  validateFields,
];

exports.createUserValidation = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("email")
    .notEmpty()
    .withMessage("Email cannoot be null")
    .isEmail()
    .withMessage("Email must be a correct form"),
  body("password").notEmpty().withMessage("Email cannoot be null"),
  validateFields,
];

exports.createRepairValidation = [
  body("date").notEmpty().withMessage("Date cannot be null"),
  body("motorsNumber").notEmpty().withMessage("motorsNumber cannot be null"),
  body("description").notEmpty().withMessage("description cannot be null"),
  body("userId").notEmpty().withMessage("userId cannot be null"),
  validateFields,
];
