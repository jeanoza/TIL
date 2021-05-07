import React, { useState } from "react";

function TodoForm({ onInsert }) {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (event) => {
    onInsert(value);
    event.preventDefault();
    setValue("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="input todos" onChange={onChange} value={value} />
        <button>submit</button>
      </form>
    </div>
  );
}

export default TodoForm;
