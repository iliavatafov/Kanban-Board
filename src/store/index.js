import { configureStore } from "@reduxjs/toolkit";

import loadingSlice from "./loadingSlice";
import modalSlice from "./modalSlice";
import errorSlice from "./errorSlice";
import tasksSlice from "./tasksSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    error: errorSlice,
    tasks: tasksSlice,
  },
});
