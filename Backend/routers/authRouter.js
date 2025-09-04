const express = require("express");
const { Login ,Register , TokenRefresh , Logout , ChangePassword} = require("../controllers/auth");
const validate = require("../middleware/validate");
const { loginValidation , registerValidation ,forgetPasswordValidation} = require("../utils/authValidation");
const { authenticate } = require("../middleware/auth");


const authRouter = express.Router();

authRouter.post("/login", loginValidation , validate, Login);
authRouter.post("/register", registerValidation , validate , Register);
authRouter.post("/refresh", TokenRefresh)
authRouter.post("/logout", authenticate() , Logout)
authRouter.post("/change-password", authenticate() , forgetPasswordValidation , validate , ChangePassword)

module.exports = authRouter;
