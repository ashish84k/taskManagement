
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  users: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUsers(state, action) {
      state.users = action.payload;
    },
    logout(state) {
      state.role = null;
      state.user = null;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };

      if (action.payload.role) {
        state.role = action.payload.role;
      }
    },

    updateUserById(state, action) {
      const { id, updatedData } = action.payload;
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      );
    },

    deleteUserById: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const { fetchUsers, logout, updateUser, updateUserById , deleteUserById } =
  authSlice.actions;

export default authSlice.reducer;
