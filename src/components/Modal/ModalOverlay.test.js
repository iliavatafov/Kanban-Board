import { render } from "@testing-library/react";

import { ModalOverlay } from "./ModalOverlay";

describe("ModalOverlay", () => {
  it("renders without errors", () => {
    render(<ModalOverlay />);
  });

  it("renders children components", () => {
    const { getByText } = render(
      <ModalOverlay>
        <div>Child Component</div>
      </ModalOverlay>
    );
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("renders with the correct CSS class", () => {
    const { container } = render(<ModalOverlay />);
    expect(container.firstChild).toHaveClass("modal-container");
  });
});
