import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "../../store/modalSlice";
import loadingSlice from "../../store/loadingSlice";
import errorSlice from "../../store/errorSlice";
import tasksSlice from "../../store/tasksSlice";

import { Dashboard } from "./Dashboard";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    error: errorSlice,
    tasks: tasksSlice,
  },
});

const tasks = [
  {
    id: 1,
    title: "Task 1",
    status: "to do",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 1,
  },
  {
    id: 2,
    title: "Task 2",
    status: "in progress",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 5,
  },
  {
    id: 3,
    title: "Task 3",
    status: "in review",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 20,
  },
  {
    id: 4,
    title: "Task 4",
    status: "done",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 5,
  },
  {
    id: 5,
    title: "Task 5",
    status: "done",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 5,
  },
  {
    id: 6,
    title: "Task 6",
    status: "done",
    color: "#ffeb3b",
    currentDate: "2023-06-11",
    deadline: "2023-06-14",
    description: "sdffgfgfgg",
    storyPoints: 5,
  },
];

describe("Dashboard component", () => {
  test("renders columns with correct titles", () => {
    render(
      <Provider store={store}>
        <Dashboard tasks={tasks} />
      </Provider>
    );

    expect(screen.getByText("TO DO")).toBeInTheDocument();
    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("IN REVIEW")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  test("renders correct number of tasks in each column", () => {
    render(
      <Provider store={store}>
        <Dashboard tasks={tasks} />
      </Provider>
    );

    const allColumnTasks = screen.getAllByText("Task", { exact: false });
    const toDoColumnTasks = screen.getAllByText("Task 1");
    const inProgressColumnTasks = screen.getAllByText("Task 2");
    const inReviewColumnTasks = screen.queryAllByText("Task 3");
    const doneColumnTasks = screen.queryAllByText((content, element) => {
      return (
        content.startsWith("Task") &&
        parseInt(content.split(" ")[1]) >= 4 &&
        parseInt(content.split(" ")[1]) <= 6
      );
    });

    expect(allColumnTasks.length).toBe(6);
    expect(toDoColumnTasks.length).toBe(1);
    expect(inProgressColumnTasks.length).toBe(1);
    expect(inReviewColumnTasks.length).toBe(1);
    expect(doneColumnTasks).toHaveLength(3);
  });
});
