import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasks(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },

    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);

      if (task) {
        Object.assign(task, updates);

        if (typeof updates.progress === "number") {
          if (updates.progress >= 100) {
            task.status = "completed";
            task.progress = 100;
          } else if (updates.progress > 0) {
            task.status = "in-progress";
            // task.progress = 50;
          } else {
            task.status = "pending";
            task.progress = 0;
          }
        }
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { fetchTasks, addTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
