import { ColorPickerInput } from "./";
import { screen } from "@testing-library/react";
import { MockFormik, render } from "../../utils/test";

describe("ColorPickerInput spec", () => {
  it("should render the component", () => {
    const { container } = render(
      <MockFormik>
        <ColorPickerInput name="MOCK_NAME" label="Mock Label" />
      </MockFormik>
    );
    expect(container.innerHTML).toBeTruthy();
  });

  it("should render the label", async () => {
    render(
      <MockFormik>
        <ColorPickerInput name="MOCK_NAME" label="Mock Label" />
      </MockFormik>
    );
    const label = await screen.findByText("Mock Label");
    expect(label).toBeTruthy();
  });

  it("should render the input", async () => {
    render(
      <MockFormik>
        <ColorPickerInput name="MOCK_NAME" label="Mock Label" />
      </MockFormik>
    );
    const input = screen.getByRole("textbox")
    expect(input).toBeTruthy();
  });

  it("should render a color box suffix", async () => {
    const { container } = render(
        <MockFormik>
          <ColorPickerInput name="MOCK_NAME" label="Mock Label" />
        </MockFormik>
      );
    const colorBox = container.querySelector(".colorButton")
    expect(colorBox).toBeTruthy();
  });
});
