import { ColorTable } from "./";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { render } from "../../utils/test";
import nock from "nock";
import { API_ENDPOINT } from "../../constants";
import httpAdapter from "axios/lib/adapters/http";
import axios from "axios";

axios.defaults.adapter = httpAdapter;
const MOCK_COLORS = [
  {
    id: 1,
    name: "red",
    hex: "#FF0000",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "black",
    hex: "#000000",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "green",
    hex: "#00FF00",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("ColorTable spec", () => {
  it("should render add new color button", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    render(<ColorTable />);
    await waitForElementToBeRemoved(screen.queryByText("No Data"));
    const button = screen.getByText("Add new color")
    expect(button).toBeTruthy()
  });

  it("should render rows after initial loading", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorTable />);
    const noData = screen.queryByText("No Data");
    expect(noData).toBeTruthy();
    const spinner = await waitFor(() => container.querySelector(".ant-spin"));
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(screen.queryByText("No Data"));
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(MOCK_COLORS.length + 1);
    MOCK_COLORS.forEach((color) => {
      const name = screen.getByText(color.name);
      const hex = screen.getByText(color.hex);
      expect(name).toBeTruthy();
      expect(hex).toBeTruthy();
    });
  });

  it("should delete row on delete request", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    nock(API_ENDPOINT).delete("/color/red").once().reply(200, MOCK_COLORS[0]);
    render(<ColorTable />);
    await waitForElementToBeRemoved(screen.queryByText("No Data"));
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);
    await waitForElementToBeRemoved(screen.queryByText(MOCK_COLORS[0].name));
    const deletedRow = screen.queryByText(MOCK_COLORS[0].name);
    expect(deletedRow).toBeNull();
  });
});
