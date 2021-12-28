import { ColorForm } from "./";
import {
  fireEvent,
  screen,
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

const MOCK_NEW_COLOR = {
  id: 4,
  name: "purple",
  hex: "#FF00FF",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("ColorForm spec", () => {
  it("should render two inputs and a button after initial loading", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorForm />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Hex")).toBeTruthy();
    const button = screen.getByText("Save");
    expect(button).toBeTruthy();
  });

  it("should show error message if name is left empty", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorForm />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [name] = inputs;
    fireEvent.blur(name);
    const error = await screen.findByText("Color name is required");
    expect(error).toBeTruthy();
  });

  it("should show error message if hex is left empty", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorForm />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [, hex] = inputs;
    fireEvent.blur(hex);
    const error = await screen.findByText("Color hex is required");
    expect(error).toBeTruthy();
  });

  it("should show error message if hex is invalid", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorForm />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [, hex] = inputs;
    fireEvent.change(hex, { target: { value: "Invalid hex" } });
    fireEvent.blur(hex);
    const error = await screen.findByText(
      "Invalid hex format. Only #XXX or #XXXXXX is permitted."
    );
    expect(error).toBeTruthy();
  });

  it("should prefill data if color is supplied", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    const { container } = render(<ColorForm colorName={MOCK_COLORS[0].name} />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [name, hex] = inputs;
    expect(name).toHaveAttribute("value", MOCK_COLORS[0].name);
    expect(hex).toHaveAttribute("value", MOCK_COLORS[0].hex);
  });

  it("should display success message if new color is added", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    nock(API_ENDPOINT)
      .put(`/color/${MOCK_NEW_COLOR.name}`)
      .once()
      .reply(200, MOCK_NEW_COLOR);
    const { container } = render(<ColorForm />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [name, hex] = inputs;
    fireEvent.change(name, { target: { value: MOCK_NEW_COLOR.name } });
    fireEvent.change(hex, { target: { value: MOCK_NEW_COLOR.hex } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    const successMessage = await screen.findByText("Color added");
    expect(successMessage).toBeTruthy();
  });

  it("should display success message if a color is updated", async () => {
    nock(API_ENDPOINT).get("/color").once().reply(200, MOCK_COLORS);
    nock(API_ENDPOINT)
      .post(`/color/${MOCK_COLORS[0].name}`)
      .once()
      .reply(200, MOCK_NEW_COLOR);
    const { container } = render(<ColorForm colorName={MOCK_COLORS[0].name} />);
    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeTruthy();
    await waitForElementToBeRemoved(spinner);
    const inputs = screen.getAllByRole("textbox");
    const [name, hex] = inputs;
    fireEvent.change(name, { target: { value: MOCK_NEW_COLOR.name } });
    fireEvent.change(hex, { target: { value: MOCK_NEW_COLOR.hex } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    const successMessage = await screen.findByText("Color updated");
    expect(successMessage).toBeTruthy();
  });
});
