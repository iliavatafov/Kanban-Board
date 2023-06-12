import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";

import { AddUpdateTask } from "./AddUpdateTask";

const mockStore = createMockStore([]);

describe("AddUpdateTask", () => {
  it("renders the form when loading is false", () => {
    const store = mockStore({
      modal: {
        update: {
          isUpdate: false,
        },
      },
      loading: {
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <AddUpdateTask />
      </Provider>
    );

    const formElement = screen.getByTestId("add-update-form");
    expect(formElement).toBeInTheDocument();
  });

  it("not renders the form when loading is true", () => {
    const store = mockStore({
      modal: {
        update: {
          isUpdate: false,
        },
      },
      loading: {
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <AddUpdateTask />
      </Provider>
    );

    const formElement = screen.queryByTestId("add-update-form");
    expect(formElement).not.toBeInTheDocument();
  });

  it("displays validation messages when form is submitted with invalid data", () => {
    const store = mockStore({
      modal: {
        update: {
          isUpdate: false,
        },
      },
      loading: {
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <AddUpdateTask />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(submitButton);

    const titleValidationMessage = screen.getByText(
      /The title should be at least 5 characters long/i
    );
    expect(titleValidationMessage).toBeInTheDocument();

    const descriptionValidationMessage = screen.getByText(
      /The description should be at least 10 characters long/i
    );
    expect(descriptionValidationMessage).toBeInTheDocument();

    const deadlineValidationMessage = screen.getByText(
      /The deadline is mandatory field/i
    );
    expect(deadlineValidationMessage).toBeInTheDocument();
  });
});
