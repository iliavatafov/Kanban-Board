import { loadingActions, default as loadingReducer } from "./loadingSlice";

describe("loading slice", () => {
  describe("showLoading action", () => {
    it("should set loading to true in the state", () => {
      const initialState = {
        loading: false,
      };

      const action = loadingActions.showLoading();

      const newState = loadingReducer(initialState, action);

      expect(newState.loading).toBe(true);
    });
  });

  describe("hideLoading action", () => {
    it("should set loading to false in the state", () => {
      const initialState = {
        loading: true,
      };

      const action = loadingActions.hideLoading();

      const newState = loadingReducer(initialState, action);

      expect(newState.loading).toBe(false);
    });
  });
});
