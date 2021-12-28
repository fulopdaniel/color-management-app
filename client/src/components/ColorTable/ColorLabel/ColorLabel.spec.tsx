import { ColorLabel } from "./";
import { screen } from "@testing-library/react";
import { render } from "../../../utils/test";

describe("ColorLabel spec", () => {
  it("should render the component", () => {
    const { container } = render(<ColorLabel hex="#FF0000" />);
    expect(container.innerHTML).toBeTruthy();
  });

  it("should render the hex as string", async () => {
    render(<ColorLabel hex="#FF0000" />);
    const text = await screen.findByText("#FF0000")
    expect(text).toBeTruthy();
  });
});
