const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const GetAllTask = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll();

  if (!tasks || tasks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No tasks found",
    });
  }

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

const GetTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

const AddTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    assignee,
    priority,
    status,
    dueDate,
    category,
    progress,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  try {
    const newTask = await Task.create({
      title,
      description,
      assignee,
      priority,
      status,
      dueDate,
      category,
      progress,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create task",
    });
  }
});

// const updateTask = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params; // URL se id
//     const {
//       title,
//       description,
//       assignee,
//       priority,
//       status,
//       dueDate,
//       category,
//       progress,
//     } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: "Task ID is required" });
//     }

//     const task = await Task.findOne({ where: { id } });
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     // 2. Update karo
//     await Task.update(
//       {
//         title,
//         description,
//         assignee,
//         priority,
//         status,
//         dueDate,
//         category,
//         progress,
//       },
//       { where: { id } }
//     );

//     // 3. Updated record wapas lao
//     const updatedTask = await Task.findOne({ where: { id } });

//     res.status(200).json({
//       message: "Task updated successfully",
//       task: updatedTask,
//     });
//   } catch (error) {
//     console.error("Error updating task:", error.message);
//     res
//       .status(500)
//       .json({
//         message: "Server error while updating task",
//         error: error.message,
//       });
//   }
// });


const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(req.body);
    
    
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task =  await Task.findOne({ where: { id } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update(req.body);

    res.status(200).json({
      message: "Task updated successfully",
      task, 
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({
      message: "Server error while updating task",
      error: error.message,
    });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    
    const deleted = await Task.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Database error while deleting task" });
  }
});



module.exports = { GetAllTask, GetTask, AddTask, updateTask, deleteTask };
