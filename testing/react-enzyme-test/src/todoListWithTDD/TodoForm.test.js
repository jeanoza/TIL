import TodoForm from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<TodoForm/>", () => {
  const setup = (props = {}) => {
    render(<TodoForm {...props} />);
    const input = screen.getByPlaceholderText("input todos");
    const button = screen.getByText("submit");
    return { input, button };
  };
  it("has input and button", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
  it("change input", () => {
    const { input } = setup();
    userEvent.type(input, "learn TDD");
    expect(input).toHaveAttribute("value", "learn TDD");
  });
  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });
    userEvent.type(input, "learn TDD");
    expect(input).toHaveAttribute("value", "learn TDD");
    userEvent.click(button);
    expect(onInsert).toBeCalledWith("learn TDD");
    expect(input).toHaveAttribute("value", "");
  });
});
