import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errorMessage: "",
  },
  reducers: {
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.errorMessage = "";
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
