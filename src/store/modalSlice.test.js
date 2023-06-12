import { modalActions, default as modalReducer } from "./modalSlice";

const initialModalState = {
  add: false,
  error: false,
  update: {
    isUpdate: false,
    id: "",
  },
};

describe("modal slice", () => {
  describe("openModal action", () => {
    it("should open the specified modal and close others in the state", () => {
      const initialState = { ...initialModalState };

      const action = modalActions.openModal("add");

      const newState = modalReducer(initialState, action);

      expect(newState.add).toBe(true);
      expect(newState.error).toBe(false);
      expect(newState.update.isUpdate).toBe(false);
      expect(newState.update.id).toBe("");
    });
  });

  describe("closeModal action", () => {
    it("should reset the state to the initial modal state", () => {
      const initialState = {
        add: true,
        error: false,
        update: {
          isUpdate: true,
          id: "123",
        },
      };

      const action = modalActions.closeModal();

      const newState = modalReducer(initialState, action);

      expect(newState).toEqual(initialModalState);
    });
  });

  describe("setUpdate action", () => {
    it("should set the update values in the state", () => {
      const initialState = { ...initialModalState };

      const action = modalActions.setUpdate("123");

      const newState = modalReducer(initialState, action);

      expect(newState.update).toEqual({
        isUpdate: true,
        id: "123",
      });
    });
  });

  describe("clearUpdate action", () => {
    it("should clear the update values in the state", () => {
      const initialState = {
        add: false,
        error: false,
        update: {
          isUpdate: true,
          id: "123",
        },
      };

      const action = modalActions.clearUpdate();

      const newState = modalReducer(initialState, action);

      expect(newState.update).toEqual({
        isUpdate: false,
        id: "",
      });
    });
  });
});
