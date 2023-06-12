import { errorActions, default as errorReducer } from "./errorSlice";

describe("error slice", () => {
  describe("setError action", () => {
    it("should set the error message in the state", () => {
      const initialState = {
        errorMessage: "",
      };

      const action = errorActions.setError("Some error message");

      const newState = errorReducer(initialState, action);

      expect(newState.errorMessage).toBe("Some error message");
    });
  });

  describe("clearError action", () => {
    it("should clear the error message in the state", () => {
      const initialState = {
        errorMessage: "Some error message",
      };

      const action = errorActions.clearError();

      const newState = errorReducer(initialState, action);

      expect(newState.errorMessage).toBe("");
    });
  });
});
