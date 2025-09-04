
const Users = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const GetAllUser = asyncHandler(async (req, res) => {
   
    
  const users = await Users.findAll();
  
  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No User found",
    });
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

const updateUser = asyncHandler(async (req, res) => {
   
  try {
    const { id } = req.params; // URL se user id
    const { fullName, email, role } = req.body; // body se data

    // 1. User dhundo
    const user = await Users.findOne({where:{id}});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;

  
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Server error while updating user",
      error: error.message,
    });
  }
});



const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }


    const deletedCount = await Users.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({
      message: "Server error while deleting user",
      error: error.message,
    });
  }
});



// const GetTask = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid task ID",
//     });
//   }

//   const task = await Task.findByPk(id);

//   if (!task) {
//     return res.status(404).json({
//       success: false,
//       message: "Task not found",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: task,
//   });
// });


// const AddTask = asyncHandler(async (req, res) => {
//   const { title, description, assignee, priority, status, dueDate, category, progress } = req.body;


//   if (!title || !description) {
//     return res.status(400).json({
//       success: false,
//       message: "Title and description are required",
//     });
//   }

//   try {
//     const newTask = await Task.create({
//       title,
//       description,
//       assignee,
//       priority,
//       status,
//       dueDate,
//       category,
//       progress,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Task created successfully",
//       data: newTask,
//     });
//   } catch (err) {
   
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Failed to create task",
//     });
//   }
// });

module.exports = { GetAllUser , updateUser , deleteUser};
