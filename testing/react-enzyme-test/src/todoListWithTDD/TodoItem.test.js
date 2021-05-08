import TodoItem from "./TodoItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoItem/>", () => {
  const sampleTodo = {
    id: 1,
    text: "Learn TDD",
    done: false,
  };
  const setup = (props = {}) => {
    const initialProps = { todo: sampleTodo };
    render(<TodoItem {...initialProps} {...props} />);
    const todo = props.todo || initialProps.todo;
    const span = screen.getByText(todo.text);
    const button = screen.getByText("delete");
    return { span, button };
  };
  it("has todo span & button", () => {
    const { span, button } = setup(sampleTodo);
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });
  it("shows line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: true } });
    expect(span).toHaveStyle("text-decoration:line-through");
  });
  it("does not show line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: false } });
    expect(span).not.toHaveStyle("text-decoration:line-through");
  });
  it("calls onToggle", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });
    userEvent.click(span);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });
  it("calls onRemove", () => {
    const onRemove = jest.fn();
    const { button } = setup({ onRemove });
    userEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});
