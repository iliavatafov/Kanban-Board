import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./Button";

describe("Button component", () => {
  test("renders button with correct title", () => {
    const title = "Submit";
    render(<Button title={title} />);
    const buttonElement = screen.getByText(title);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders button with correct color", () => {
    const color = "primary";
    render(<Button title="Button" color={color} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass(color);
  });

  test("calls action on button click", () => {
    const mockAction = jest.fn();
    render(<Button title="Button" action={mockAction} />);
    const buttonElement = screen.getByText("Button");
    fireEvent.click(buttonElement);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test("disables button when disableButton prop is true", () => {
    render(<Button title="Button" disableButton={true} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toBeDisabled();
  });
});
