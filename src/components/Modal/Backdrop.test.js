import { render } from "@testing-library/react";

import { Backdrop } from "./Backdrop";

describe("Backdrop", () => {
  it("renders without errors", () => {
    render(<Backdrop />);
  });

  it("renders with the correct CSS class", () => {
    const { container } = render(<Backdrop />);
    expect(container.firstChild).toHaveClass("backdrop");
  });
});
