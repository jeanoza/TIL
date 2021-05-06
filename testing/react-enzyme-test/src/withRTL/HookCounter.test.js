import HookCounter from "../HookCounter";
import { render, fireEvent } from "@testing-library/react";

describe("<HookCounter/>", () => {
  let utils;
  beforeEach(() => {
    utils = render(<HookCounter />);
  });
  it("matches snapshot", () => {
    expect(utils.container).toMatchSnapshot();
  });
  it("has a number and two button", () => {
    utils.getByText("0");
    utils.getByText("+1");
    utils.getByText("-1");
  });
  it("plus button test", () => {
    const number = utils.getByText("0");
    const plusButton = utils.getByText("+1");
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent("2");
  });
  it("minus button test", () => {
    const number = utils.getByText("0");
    const minusButton = utils.getByText("-1");
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(number).toHaveTextContent("-2");
  });
});
