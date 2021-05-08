import TodoApp from "./TodoApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoApp/>", () => {
  beforeEach(() => {
    render(<TodoApp />);
  });
  it("renders TodoForm & TodoList", () => {
    screen.getByText("submit");
    screen.getByTestId("TodoList");
  });
  it("renders two defaults todos", () => {
    screen.getByText("Learn TDD");
    screen.getByText("Learn Testing Library");
  });
  it("creates new todo", () => {
    const input = screen.getByPlaceholderText("input todos");
    const button = screen.getByText("submit");
    userEvent.type(input, "Add new todo");
    userEvent.click(button);
    screen.getByText("Add new todo");
  });
  it("toggles todo", () => {
    const todoText = screen.getByText("Learn TDD");
    expect(todoText).toHaveStyle("text-decoration:line-through");
    userEvent.click(todoText);
    expect(todoText).not.toHaveStyle("text-decoration:line-through");
    userEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration:line-through");
  });

  it("remove todo", () => {
    const todoText = screen.getByText("Learn TDD");
    const removeButton = todoText.nextSibling;
    userEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument();
  });
});
