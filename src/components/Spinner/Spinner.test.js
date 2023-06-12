import { render } from "@testing-library/react";
import { DotLoader } from "react-spinners";

import { Spinner } from "./Spinner";

jest.mock("react-spinners", () => ({
  DotLoader: jest.fn(() => <div data-testid="dot-loader" />),
}));

describe("Spinner", () => {
  it("renders the DotLoader component", () => {
    render(<Spinner />);
    expect(DotLoader).toHaveBeenCalledTimes(1);
    expect(DotLoader).toHaveBeenCalledWith({ color: "#36d7b7" }, {});
  });
});
