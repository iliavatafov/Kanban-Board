import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  add: false,
  error: false,
  update: {
    isUpdate: false,
    id: "",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      const { payload } = action;
      return {
        ...state,
        add: payload === "add",
        error: payload === "error",
        update: {
          isUpdate: false,
          id: "",
        },
      };
    },
    closeModal() {
      return initialModalState;
    },
    setUpdate(state, action) {
      state.update = {
        isUpdate: true,
        id: action.payload,
      };
    },
    clearUpdate(state) {
      state.update = {
        isUpdate: false,
        id: "",
      };
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
