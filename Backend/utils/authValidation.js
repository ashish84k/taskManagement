const { body } = require("express-validator");
const dns = require("dns").promises;


const validateEmailDomain = async (email) => {
  const domain = email.split("@")[1];
  if (!domain) throw new Error("Invalid email domain");

  try {
   
    const records = await dns.resolveMx(domain);
    if (!records || records.length === 0) {
      throw new Error("Email domain does not exist");
    }
    return true;
  } catch (err) {
    throw new Error("Invalid email domain");
  }
};


const registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail()
    .custom(validateEmailDomain), 

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
    .matches(/[\W_]/).withMessage("Password must contain at least one special character"),
];


const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];


const forgetPasswordValidation = [
  body("oldPassword")
    .notEmpty().withMessage("Old password is required")
    .isLength({ min: 6 }).withMessage("Old password must be at least 6 characters"),

  body("newPassword")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("New password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("New password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("New password must contain at least one number")
    .matches(/[\W_]/).withMessage("New password must contain at least one special character"),
];


module.exports = { registerValidation, loginValidation , forgetPasswordValidation };
