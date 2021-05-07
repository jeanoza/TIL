import React from "react";

function TodoItem({ todo, onToggle, onRemove }) {
  const { id, text, done } = todo;

  return (
    <li>
      <span
        style={
          done ? { textDecoration: "line-through" } : { textDecoration: "none" }
        }
        onClick={() => onToggle(id)}
      >
        {text}
      </span>
      <button onClick={() => onRemove(id)}>delete</button>
    </li>
  );
}

export default TodoItem;
