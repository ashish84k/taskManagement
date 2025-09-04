const express = require("express");

const { authenticate } = require("../middleware/auth");
const { GetAllUser ,updateUser , deleteUser} = require("../controllers/User");
const UserRouter = express.Router();



UserRouter.get("/", authenticate(['admin' , 'manager']) , GetAllUser);
UserRouter.put("/:id", authenticate(['admin' , 'manager']), updateUser);
UserRouter.delete("/:id", authenticate(['admin' , 'manager']), deleteUser);



module.exports = UserRouter;
