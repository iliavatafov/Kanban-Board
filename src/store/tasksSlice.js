import { createSlice } from "@reduxjs/toolkit";

const initialModalState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialModalState,
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    },
    updateTask(state, action) {
      const updatedTask = action.payload;
      const taskIndex = state.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state[taskIndex] = updatedTask;
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
