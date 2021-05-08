import React, { useRef, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([
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
  ]);
  const nextId = useRef(
    todos && todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
  );
  const onInsert = (text) => {
    setTodos([...todos, { id: nextId.current, text, done: false }]);
    nextId.current += 1;
  };
  const onToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
}

export default TodoApp;
