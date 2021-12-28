import { RowActions } from "./";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../utils/test";

const MOCK_COLOR = {
  id: 1,
  name: "red",
  hex: "#FF0000",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("ColorLabel spec", () => {

  it("should render the component", () => {
    const { container } = render(<RowActions color={MOCK_COLOR} />);
    expect(container.innerHTML).toBeTruthy();
  });

  it("should render two buttons", () => {
    render(<RowActions color={MOCK_COLOR} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("should render an edit button", () => {
    render(<RowActions color={MOCK_COLOR} />);
    const btn = screen.getByText("Edit");
    const link = screen.getByRole("link");
    expect(btn).toBeTruthy();
    expect(link).toHaveAttribute("href", `/colors/${MOCK_COLOR.name}`);
  });

  it("should render a delete button", () => {
    render(<RowActions color={MOCK_COLOR} />);
    const btn = screen.getByText("Delete");
    expect(btn).toBeTruthy();
  });

  it("should render a popconfirm on delete click", () => {
    render(<RowActions color={MOCK_COLOR} />);
    const btn = screen.getByText("Delete");
    fireEvent.click(btn);
    const warningText = screen.getByText(
      "Are you sure you want to delete this color?"
    );
    expect(warningText).toBeTruthy();
  });
});
