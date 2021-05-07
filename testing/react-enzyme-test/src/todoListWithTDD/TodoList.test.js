import TodoList from "./TodoList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoList/>", () => {
  const sampleTodos = [
    {
      id: 1,
      text: "Learn TDD",
      done: true,
    },
    {
      id: 2,
      text: "Learn Testing Library",
      done: true,
    },
  ];
  it("Renders todos", () => {
    render(<TodoList todos={sampleTodos} />);
    screen.getByText(sampleTodos[0].text);
    screen.getByText(sampleTodos[1].text);
  });
  it("calls on Toggle and onRemove", () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    render(
      <TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />
    );
    userEvent.click(screen.getByText(sampleTodos[0].text));
    expect(onToggle).toBeCalledWith(sampleTodos[0].id);
    userEvent.click(screen.getAllByText("delete")[0]);
    // userEvent.click(screen.getByText("delete")); - ne marche pas parce que c'est plusieurs.
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });
});
