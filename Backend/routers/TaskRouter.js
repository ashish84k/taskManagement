const express = require("express");
const { GetAllTask , AddTask , GetTask ,updateTask , deleteTask} = require("../controllers/Task");
const { authenticate } = require("../middleware/auth");
const TaskRouter = express.Router();



TaskRouter.get("/", authenticate() , GetAllTask);
TaskRouter.get("/:id", authenticate(), GetTask)
TaskRouter.delete("/:id", authenticate(['admin' , 'manager']), deleteTask)
TaskRouter.put("/:id", authenticate(['user','admin' , 'manager']), updateTask)
TaskRouter.post("/add", authenticate(['admin' , 'manager']), AddTask);
TaskRouter.put("/update/:id", authenticate(), updateTask);

module.exports = TaskRouter;
