import { tasksActions, default as tasksReducer } from "./tasksSlice";

describe("tasksSlice", () => {
  describe("reducers", () => {
    it("should handle setTasks", () => {
      const initialState = [];
      const tasks = [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ];
      const nextState = tasksReducer(
        initialState,
        tasksActions.setTasks(tasks)
      );

      expect(nextState).toEqual(tasks);
    });

    it("should handle addTask", () => {
      const initialState = [{ id: 1, title: "Task 1" }];
      const newTask = { id: 2, title: "Task 2" };
      const nextState = tasksReducer(
        initialState,
        tasksActions.addTask(newTask)
      );

      expect(nextState).toEqual([...initialState, newTask]);
    });

    it("should handle updateTask", () => {
      const initialState = [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ];
      const updatedTask = { id: 2, title: "Updated Task 2" };
      const nextState = tasksReducer(
        initialState,
        tasksActions.updateTask(updatedTask)
      );

      expect(nextState).toEqual([{ id: 1, title: "Task 1" }, updatedTask]);
    });
  });
});
