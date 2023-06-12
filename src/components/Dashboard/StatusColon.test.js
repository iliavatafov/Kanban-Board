import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { StatusColon } from "./StatusColon";

const mockStore = configureStore([]);

describe("StatusColon component", () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      status: "done",
      color: "#ffeb3b",
      currentDate: "2023-06-11",
      deadline: "2023-06-14",
      description: "sdffgfgfgg",
      storyPoints: 1,
    },
    {
      id: 2,
      title: "Task 2",
      status: "done",
      color: "#ffeb3b",
      currentDate: "2023-06-11",
      deadline: "2023-06-14",
      description: "sdffgfgfgg",
      storyPoints: 2,
    },
    {
      id: 3,
      title: "Task 3",
      status: "done",
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
      storyPoints: 20,
    },
    {
      id: 5,
      title: "Task 6",
      status: "done",
      color: "#ffeb3b",
      currentDate: "2023-06-11",
      deadline: "2023-06-14",
      description: "sdffgfgfgg",
      storyPoints: 20,
    },
  ];

  test("renders the title correctly", () => {
    const title = "to do";
    const store = mockStore({});

    render(
      <Provider store={store}>
        <StatusColon title={title} tasks={tasks} />
      </Provider>
    );

    expect(screen.getByText(title.toUpperCase())).toBeInTheDocument();
  });

  test("renders the correct number of tasks", () => {
    const title = "in progress";
    const store = mockStore({});

    render(
      <Provider store={store}>
        <StatusColon title={title} tasks={tasks} />
      </Provider>
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("renders the task cards", () => {
    const title = "Done";
    const store = mockStore({});

    render(
      <Provider store={store}>
        <StatusColon title={title} tasks={tasks} />
      </Provider>
    );

    const doneTasks = tasks.filter((task) => task.status === title);

    doneTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
    doneTasks.forEach((task) => {
      expect(screen.getByText(task.deadline)).toBeInTheDocument();
    });
  });
});
