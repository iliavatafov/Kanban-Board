import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { TaskCard } from "./TaskCard";

const mockStore = configureMockStore();
const store = mockStore({});

const task = {
  id: 1,
  title: "Task 1",
  status: "to do",
  color: "#ffeb3b",
  currentDate: "2023-06-11",
  deadline: "2023-06-14",
  description: "sdffgfgfgg",
  storyPoints: 1,
};

describe("TaskCard", () => {
  it("renders the task with correct details", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskCard task={task} />
      </Provider>
    );

    const titleElement = getByText("Task 1");
    const deadlineElement = getByText("2023-06-14");

    expect(titleElement).toBeInTheDocument();
    expect(deadlineElement).toBeInTheDocument();
  });
});
